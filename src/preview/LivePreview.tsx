import React, { useMemo, useEffect, useRef } from 'react';
import { renderToHtml } from '@unlayer/react-elements';
import { useDocumentState } from '../hooks/useDocumentState';



const viewports: Record<string, { width: string; height: string }> = {
  desktop: { width: '1440px', height: '900px' },
  laptop: { width: '1280px', height: '800px' },
  tablet: { width: '768px', height: '1024px' },
  phone: { width: '375px', height: '812px' },
  letter: { width: '816px', height: '1056px' },
  a4: { width: '794px', height: '1123px' },
  poster: { width: '1728px', height: '2592px' },
  presentation: { width: '1920px', height: '1080px' },
  tv: { width: '3840px', height: '2160px' },
  cinema: { width: '4096px', height: '1716px' },
  imax: { width: '4096px', height: '2987px' },
  'vision-pro': { width: '2560px', height: '1440px' },
  watch: { width: '198px', height: '242px' },
  kindle: { width: '1080px', height: '1440px' },
  ultrawide: { width: '3440px', height: '1440px' }
};

import { BlockRenderer } from '../blocks/BlockRenderer';
import { exportBlocksToMarkdown, exportBlocksToLatex } from '../blocks/transpilers';
import { Document } from '@unlayer/react-elements';

export const LivePreview: React.FC = () => {
  const { state, dispatch } = useDocumentState();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const getTemplate = () => {
    // Resolve variables in all blocks (in a real app, this should be a recursive deep resolve on blocks)
    // For now we just pass the blocks down.
    
    return (
      <Document>
        {state.blocks?.map(block => (
          <BlockRenderer key={block.id} block={block} theme={state.theme} sectionStyles={state.sectionStyles} />
        ))}
      </Document>
    );
  };

  const renderedHtml = useMemo(() => {
    try {
      let html = renderToHtml(getTemplate());

      const fontsToLoad = [];
      const baseFont = state.theme?.typography?.fontFamily?.split(',')?.[0]?.replace(/['"]/g, '')?.trim() || 'Inter';
      const monoFont = state.theme?.typography?.fontFamilyMono?.split(',')?.[0]?.replace(/['"]/g, '')?.trim() || 'Fira Code';
      
      if (['Inter', 'Playfair Display', 'Roboto'].includes(baseFont)) fontsToLoad.push(baseFont.replace(/ /g, '+'));
      if (['Fira Code'].includes(monoFont)) fontsToLoad.push(monoFont.replace(/ /g, '+'));
      
      if (fontsToLoad.length > 0) {
        const familyQuery = fontsToLoad.map(f => `family=${f}:wght@400;500;600;700`).join('&');
        const fontLink = `<link href="https://fonts.googleapis.com/css2?${familyQuery}&display=swap" rel="stylesheet" />`;
        html = html.replace('</head>', `${fontLink}</head>`);
      }
      return html;
    } catch (e: any) {
      console.error('Render error:', e);
      return `<html><body style="padding:40px;font-family:sans-serif;color:#ef4444;background:#FFFFFF"><h2>Render Error</h2><pre style="color:#e5e7eb;white-space:pre-wrap">${e?.message || e}</pre></body></html>`;
    }
  }, [state.blocks, state.sectionStyles, state.theme, state.variables]);

  useEffect(() => {
    if (state.exportTab === 'preview' && iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        
        // Inject Figma-style interactive script and styles
        const interactiveHtml = renderedHtml.replace('</body>', `
          <style>
            ::-webkit-scrollbar { width: 6px; height: 6px; }
            ::-webkit-scrollbar-track { background: transparent; }
            ::-webkit-scrollbar-thumb { background: rgba(0, 0, 0, 0.15); border-radius: 4px; }
            ::-webkit-scrollbar-thumb:hover { background: rgba(0, 0, 0, 0.3); }
            body { padding-bottom: 40px !important; }
            .studio-hoverable { outline: 2px solid #3B82F6 !important; outline-offset: -2px; cursor: default; transition: outline 0.1s; z-index: 9999; position: relative; }
            .studio-selected { outline: 2px solid #10B981 !important; outline-offset: -2px; z-index: 9999; position: relative; }
            
            @media print {
              @page { size: auto; margin: 0; }
              html, body { 
                padding: 0 !important;
                margin: 0 !important;
                -webkit-print-color-adjust: exact !important; 
                print-color-adjust: exact !important;
                background-color: #FFFFFF !important;
                height: auto !important;
              }
              body { padding: 15mm !important; }
              /* Force Unlayer's wrapping structural tables to be white instead of their default grey email canvas */
              body > table, body > div, .u-row-container {
                background-color: #FFFFFF !important;
              }
              .studio-hoverable, .studio-selected { outline: none !important; }
              div[data-block-id] { page-break-inside: avoid; break-inside: avoid; margin-bottom: 16px; }
              table { page-break-inside: auto; width: 100% !important; }
              tr { page-break-inside: avoid; page-break-after: auto; }
              td, th { page-break-inside: avoid; }
              thead { display: table-header-group; }
              tfoot { display: table-footer-group; }
              
              /* Ensure the layout fits the page width */
              table[role="presentation"], div { max-width: 100% !important; }
              img { max-width: 100% !important; height: auto !important; }
            }
          </style>
          <script>
            (function() {
              let currentHover = null;
              document.body.addEventListener('mousemove', (e) => {
                if (!e.target || typeof e.target.closest !== 'function') return;
                const target = e.target.closest('[data-block-id]');
                if (target !== currentHover) {
                  if (currentHover) currentHover.classList.remove('studio-hoverable');
                  if (target) target.classList.add('studio-hoverable');
                  currentHover = target;
                }
              });
              document.body.addEventListener('mouseleave', () => {
                if (currentHover) {
                  currentHover.classList.remove('studio-hoverable');
                  currentHover = null;
                }
              });
              document.body.addEventListener('click', (e) => {
                if (!e.target || typeof e.target.closest !== 'function') return;
                e.preventDefault();
                const target = e.target.closest('[data-block-id]');
                if (target) {
                  document.querySelectorAll('.studio-selected').forEach(el => el.classList.remove('studio-selected'));
                  target.classList.add('studio-selected');
                  window.parent.postMessage({ type: 'STUDIO_SELECT_BLOCK', blockId: target.getAttribute('data-block-id') }, '*');
                }
              });
              document.body.addEventListener('dblclick', (e) => {
                if (!e.target || typeof e.target.closest !== 'function') return;
                e.preventDefault();
                const target = e.target.closest('[data-block-id]');
                if (target) {
                  window.parent.postMessage({ type: 'STUDIO_INLINE_EDIT', blockId: target.getAttribute('data-block-id') }, '*');
                }
              });
            })();
          </script>
        </body>`);

        doc.write(interactiveHtml);
        doc.close();
      }
    }
  }, [renderedHtml, state.exportTab]);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (!e.data) return;
      if (e.data.type === 'STUDIO_SELECT_BLOCK' && e.data.blockId) {
        dispatch({ type: 'BLOCK_SET_FOCUS', payload: { blockId: e.data.blockId } });
      } else if (e.data.type === 'STUDIO_INLINE_EDIT' && e.data.blockId) {
        dispatch({ type: 'BLOCK_SET_FIELD_FOCUS', payload: { blockId: e.data.blockId, fieldKey: null } });
      }
    };
    
    const handlePdfExport = () => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.print();
      }
    };

    window.addEventListener('message', handleMessage);
    window.addEventListener('EXPORT_TO_PDF', handlePdfExport);
    return () => {
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('EXPORT_TO_PDF', handlePdfExport);
    };
  }, [dispatch]);

  const activeArtifact = state.artifacts?.find(a => a.id === state.activeArtifactId) || state.artifacts?.[0];
  const activeViewport = viewports[activeArtifact?.viewport || 'desktop'] || { width: '1024px', height: '768px' };

  return (
    <div style={{
      flex: 1,
      minWidth: 0,
      height: '100%',
      overflow: 'auto',
      backgroundColor: '#1a1a1a',
      padding: '32px',
      position: 'relative'
    }}>
      {state.guidesEnabled && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'linear-gradient(#333333 1px, transparent 1px), linear-gradient(90deg, #333333 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          opacity: 0.3,
          pointerEvents: 'none',
          zIndex: 0
        }} />
      )}

      {state.exportTab === 'preview' ? (
        <div style={{
          width: activeViewport.width,
          minHeight: activeViewport.height,
          margin: '0 auto',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
          borderRadius: '8px',
          overflow: 'hidden',
          transform: `scale(${state.zoom})`,
          transformOrigin: 'top center',
          transition: 'transform 0.2s ease, width 0.3s ease, min-height 0.3s ease',
          position: 'relative',
          zIndex: 1
        }}>
          <iframe
            ref={iframeRef}
            style={{ width: '100%', height: '100%', border: 'none', display: 'block', minHeight: activeViewport.height }}
            title={`${state.activeTemplate} preview`}
            sandbox="allow-same-origin allow-popups allow-scripts allow-modals"
          />
        </div>
      ) : (
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          backgroundColor: '#FFFFFF',
          color: '#3C3830',
          borderRadius: '8px',
          border: '1px solid #E6E4DD',
          fontFamily: '"Fira Code", "Consolas", monospace',
          fontSize: '13px',
          position: 'relative',
          zIndex: 1,
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '8px 16px', backgroundColor: '#FAFAED', borderBottom: '1px solid #E6E4DD', fontSize: '12px', fontWeight: 600, color: '#787569', display: 'flex', justifyContent: 'space-between' }}>
            <span>{state.exportTab === 'html' ? 'compiled-output.html' : state.exportTab === 'json' ? 'document-ast.json' : 'output.txt'}</span>
            <span style={{ cursor: 'pointer' }} onClick={() => {
              let textToCopy = '';
              if (state.exportTab === 'html') textToCopy = renderedHtml;
              else if (state.exportTab === 'json') textToCopy = JSON.stringify(state.documentData, null, 2);
              else if (state.exportTab === 'markdown') textToCopy = exportBlocksToMarkdown(state.blocks || []);
              else if (state.exportTab === 'latex') textToCopy = exportBlocksToLatex(state.blocks || []);
              navigator.clipboard.writeText(textToCopy);
            }}>Copy</span>
          </div>
          <div style={{ padding: '24px', overflowY: 'auto', flex: 1, whiteSpace: 'pre-wrap' }}>
            {state.exportTab === 'html' && renderedHtml}
            {state.exportTab === 'json' && JSON.stringify(state.documentData, null, 2)}
            {state.exportTab === 'markdown' && exportBlocksToMarkdown(state.blocks || [])}
            {state.exportTab === 'latex' && exportBlocksToLatex(state.blocks || [])}
          </div>
        </div>
      )}
    </div>
  );
};

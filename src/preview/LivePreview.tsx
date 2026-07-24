import React, { useMemo, useEffect, useRef } from 'react';
import { renderToHtml } from '@unlayer/react-elements';
import { useDocumentState } from '../hooks/useDocumentState';

import { ExecutiveReport } from '../templates/executive';
import { ResearchReport } from '../templates/research';
import { SecurityAuditReport } from '../templates/security';
import { IncidentReport } from '../templates/incident/IncidentReport';
import { BusinessReview } from '../templates/business/BusinessReview';
import { InvestorUpdate } from '../templates/investor/InvestorUpdate';
import { ComplianceReport } from '../templates/compliance/ComplianceReport';

const viewports: Record<string, { width: string; height: string }> = {
  desktop: { width: '1440px', height: '900px' },
  laptop: { width: '1280px', height: '800px' },
  tablet: { width: '768px', height: '1024px' },
  phone: { width: '375px', height: '812px' },
  foldable: { width: '844px', height: '1133px' },
  square: { width: '800px', height: '800px' },
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

import { resolveVariablesDeep } from '../variables';

export const LivePreview: React.FC = () => {
  const { state, dispatch } = useDocumentState();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const getTemplate = () => {
    // Deep-resolve all {{variable}} bindings in the document data before rendering
    const resolvedData = resolveVariablesDeep(state.documentData, state.variables);
    const props = { data: resolvedData, sectionStyles: state.sectionStyles, theme: state.theme };
    switch (state.activeTemplate) {
      case 'executive': return <ExecutiveReport {...props} />;
      case 'research': return <ResearchReport {...props} />;
      case 'security': return <SecurityAuditReport {...props} />;
      case 'incident': return <IncidentReport {...props} />;
      case 'business': return <BusinessReview {...props} />;
      case 'investor': return <InvestorUpdate {...props} />;
      case 'compliance': return <ComplianceReport {...props} />;
      default: return <ExecutiveReport {...props} />;
    }
  };

  const renderedHtml = useMemo(() => renderToHtml(getTemplate()), [state.activeTemplate, state.documentData, state.sectionStyles, state.theme, state.variables]);

  useEffect(() => {
    if (state.exportTab === 'preview' && iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        
        // Inject Figma-style interactive script and styles
        const interactiveHtml = renderedHtml.replace('</body>', `
          <style>
            .studio-hoverable { transition: outline 0.1s; }
            .studio-hoverable:hover { outline: 2px solid #3B82F6 !important; outline-offset: -2px; cursor: default; }
            .studio-selected { outline: 2px solid #10B981 !important; outline-offset: -2px; }
          </style>
          <script>
            document.body.addEventListener('mouseover', (e) => {
              const target = e.target.closest('table, p, h1, h2, h3, a');
              if (target) target.classList.add('studio-hoverable');
            });
            document.body.addEventListener('mouseout', (e) => {
              const target = e.target.closest('table, p, h1, h2, h3, a');
              if (target) target.classList.remove('studio-hoverable');
            });
            document.body.addEventListener('click', (e) => {
              e.preventDefault();
              const target = e.target.closest('table, p, h1, h2, h3, a');
              if (target) {
                document.querySelectorAll('.studio-selected').forEach(el => el.classList.remove('studio-selected'));
                target.classList.add('studio-selected');
                
                // Try to infer section from text content as a fallback mapping
                const text = target.innerText.toLowerCase();
                let inferredSection = null;
                if (text.includes('summary')) inferredSection = 'summary';
                else if (text.includes('metric')) inferredSection = 'metrics';
                else if (text.includes('timeline')) inferredSection = 'timeline';
                else if (text.includes('recommendation')) inferredSection = 'recommendations';
                
                window.parent.postMessage({ type: 'STUDIO_SELECT', id: inferredSection }, '*');
              }
            });
          </script>
        </body>`);

        doc.write(interactiveHtml);
        doc.close();
      }
    }
  }, [renderedHtml, state.exportTab]);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data && e.data.type === 'STUDIO_SELECT' && e.data.id) {
        dispatch({ type: 'SET_SELECTED_SECTION', payload: e.data.id });
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [dispatch]);

  const activeArtifact = state.artifacts?.find(a => a.id === state.activeArtifactId) || state.artifacts?.[0];
  const activeViewport = viewports[activeArtifact?.viewport || 'desktop'] || viewports['desktop'];

  return (
    <div style={{
      flex: 1,
      minWidth: 0,
      height: '100%',
      overflow: 'auto',
      backgroundColor: '#E5E5E5',
      padding: '32px',
      position: 'relative'
    }}>
      {state.guidesEnabled && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'linear-gradient(#d1d5db 1px, transparent 1px), linear-gradient(90deg, #d1d5db 1px, transparent 1px)',
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
            sandbox="allow-same-origin allow-popups"
          />
        </div>
      ) : (
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          backgroundColor: '#1E1E1E',
          color: '#D4D4D4',
          borderRadius: '8px',
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
          <div style={{ padding: '8px 16px', backgroundColor: '#2D2D2D', borderBottom: '1px solid #404040', fontSize: '12px', fontWeight: 600, color: '#A3A3A3', display: 'flex', justifyContent: 'space-between' }}>
            <span>{state.exportTab === 'html' ? 'compiled-output.html' : state.exportTab === 'json' ? 'document-ast.json' : 'output.txt'}</span>
            <span style={{ cursor: 'pointer' }} onClick={() => navigator.clipboard.writeText(state.exportTab === 'html' ? renderedHtml : JSON.stringify(state.documentData, null, 2))}>Copy</span>
          </div>
          <div style={{ padding: '24px', overflowY: 'auto', flex: 1, whiteSpace: 'pre-wrap' }}>
            {state.exportTab === 'html' && renderedHtml}
            {state.exportTab === 'json' && JSON.stringify(state.documentData, null, 2)}
            {state.exportTab === 'markdown' && '# Markdown Output\n\n// Markdown transpiler output will go here'}
            {state.exportTab === 'latex' && '% LaTeX Output\n\\documentclass{article}\n\\begin{document}\n\n% LaTeX transpiler output will go here\n\n\\end{document}'}
          </div>
        </div>
      )}
    </div>
  );
};

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

export const LivePreview: React.FC = () => {
  const { state } = useDocumentState();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Render the selected template to HTML using Elements renderToHtml()
  const renderedHtml = useMemo(() => {
    switch (state.activeTemplate) {
      case 'executive':
        return renderToHtml(<ExecutiveReport data={state.documentData} sectionStyles={state.sectionStyles} theme={state.theme} />);
      case 'research':
        return renderToHtml(<ResearchReport data={state.documentData} sectionStyles={state.sectionStyles} theme={state.theme} />);
      case 'security':
        return renderToHtml(<SecurityAuditReport data={state.documentData} sectionStyles={state.sectionStyles} theme={state.theme} />);
      case 'incident':
        return renderToHtml(<IncidentReport data={state.documentData} sectionStyles={state.sectionStyles} theme={state.theme} />);
      case 'business':
        return renderToHtml(<BusinessReview data={state.documentData} sectionStyles={state.sectionStyles} theme={state.theme} />);
      case 'investor':
        return renderToHtml(<InvestorUpdate data={state.documentData} sectionStyles={state.sectionStyles} theme={state.theme} />);
      case 'compliance':
        return renderToHtml(<ComplianceReport data={state.documentData} sectionStyles={state.sectionStyles} theme={state.theme} />);
      default:
        return renderToHtml(<ExecutiveReport data={state.documentData} sectionStyles={state.sectionStyles} theme={state.theme} />);
    }
  }, [state.activeTemplate, state.documentData, state.sectionStyles, state.theme]);

  // Write rendered HTML to iframe
  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe && renderedHtml) {
      const doc = iframe.contentDocument;
      if (doc) {
        doc.open();
        doc.write(renderedHtml);
        doc.close();

        // Auto-resize iframe to content height
        const resizeObserver = new ResizeObserver(() => {
          const body = doc.body;
          if (body) {
            iframe.style.height = `${body.scrollHeight + 32}px`;
          }
        });

        if (doc.body) {
          resizeObserver.observe(doc.body);
        }

        return () => resizeObserver.disconnect();
      }
    }
  }, [renderedHtml]);

  return (
    <div style={{
      flex: 1,
      minWidth: 0,
      height: '100%',
      overflowY: 'auto',
      backgroundColor: '#F3F4F6',
      padding: '32px'
    }}>
      <div style={{
        maxWidth: '850px',
        margin: '0 auto',
        backgroundColor: '#FFFFFF',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        borderRadius: '8px',
        overflow: 'hidden',
        minHeight: '1056px', // Standard 8.5x11 aspect ratio min height
      }}>
        <iframe
          ref={iframeRef}
          style={{ width: '100%', border: 'none', display: 'block', minHeight: '1056px' }}
          title={`${state.activeTemplate} preview`}
          sandbox="allow-same-origin allow-popups"
        />
      </div>
    </div>
  );
};

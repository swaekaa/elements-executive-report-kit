import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { renderToHtml } from '@unlayer/react-elements';
import { ExecutiveReport } from './templates/executive';
import { ResearchReport } from './templates/research';
import { SecurityAuditReport } from './templates/security';
import { executiveReportData } from './data/executive';
import { researchReportData } from './data/research';
import { securityReportData } from './data/security';
import './App.css';

type TemplateName = 'executive' | 'research' | 'security';

interface TemplateConfig {
  label: string;
  description: string;
}

const TEMPLATES: Record<TemplateName, TemplateConfig> = {
  executive: {
    label: 'Executive Report',
    description: 'Quarterly performance report with KPIs and recommendations',
  },
  research: {
    label: 'Research Report',
    description: 'ML experiment report with methodology and results',
  },
  security: {
    label: 'Security Audit',
    description: 'Application security assessment with findings and compliance',
  },
};

/**
 * Preview application for the Elements Executive Report Kit.
 *
 * Renders Elements templates using renderToHtml() and displays
 * the output in an iframe for accurate preview.
 */
function App() {
  const [activeTemplate, setActiveTemplate] = useState<TemplateName>('executive');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Render the selected template to HTML using Elements renderToHtml()
  const renderedHtml = useMemo(() => {
    switch (activeTemplate) {
      case 'executive':
        return renderToHtml(<ExecutiveReport data={executiveReportData} />);
      case 'research':
        return renderToHtml(<ResearchReport data={researchReportData} />);
      case 'security':
        return renderToHtml(<SecurityAuditReport data={securityReportData} />);
    }
  }, [activeTemplate]);

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

  const handlePrint = useCallback(() => {
    const iframe = iframeRef.current;
    if (iframe?.contentWindow) {
      iframe.contentWindow.print();
    }
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, template: TemplateName) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setActiveTemplate(template);
      }
    },
    []
  );

  return (
    <div className="app">
      {/* Toolbar */}
      <header className="toolbar no-print" role="banner">
        <div className="toolbar-left">
          <div>
            <div className="toolbar-title">Elements Executive Report Kit</div>
            <div className="toolbar-subtitle">Built with Unlayer Elements</div>
          </div>
        </div>

        {/* Template Tabs */}
        <nav className="tabs" role="tablist" aria-label="Template selection">
          {(Object.entries(TEMPLATES) as [TemplateName, TemplateConfig][]).map(
            ([key, config]) => (
              <button
                key={key}
                role="tab"
                aria-selected={activeTemplate === key}
                aria-controls="preview-panel"
                className={`tab ${activeTemplate === key ? 'tab--active' : ''}`}
                onClick={() => setActiveTemplate(key)}
                onKeyDown={(e) => handleKeyDown(e, key)}
                title={config.description}
              >
                {config.label}
              </button>
            )
          )}
        </nav>

        <div className="toolbar-right">
          <button
            className="btn-print"
            onClick={handlePrint}
            aria-label="Print current report"
          >
            Print
          </button>
        </div>
      </header>

      {/* Preview */}
      <main
        className="preview-container"
        id="preview-panel"
        role="tabpanel"
        aria-label={`${TEMPLATES[activeTemplate].label} preview`}
      >
        <div className="preview-frame">
          <iframe
            ref={iframeRef}
            className="preview-iframe"
            title={`${TEMPLATES[activeTemplate].label} preview`}
            sandbox="allow-same-origin allow-popups"
          />
        </div>
      </main>
    </div>
  );
}

export default App;

import React from 'react';
import { useDocumentState, TemplateId } from '../hooks/useDocumentState';
import { FileText, Shield, FlaskConical, LayoutTemplate, Briefcase, TrendingUp, ShieldAlert, Palette, Type, Settings2, Download, Code } from 'lucide-react';
import { exportToHtml, exportToJson } from '../renderer/exportUtils';
import { ExecutiveReport } from '../templates/executive';
import { ResearchReport } from '../templates/research';
import { SecurityAuditReport } from '../templates/security';

export const LeftSidebar: React.FC = () => {
  const { state, dispatch } = useDocumentState();

  const templates: { id: TemplateId; label: string; icon: React.ReactNode }[] = [
    { id: 'executive', label: 'Executive Report', icon: <Briefcase size={16} /> },
    { id: 'research', label: 'Research Report', icon: <FlaskConical size={16} /> },
    { id: 'security', label: 'Security Audit', icon: <Shield size={16} /> },
    { id: 'incident', label: 'Incident Report', icon: <ShieldAlert size={16} /> },
    { id: 'business', label: 'Business Review', icon: <TrendingUp size={16} /> },
    { id: 'investor', label: 'Investor Update', icon: <LayoutTemplate size={16} /> },
    { id: 'compliance', label: 'Compliance Report', icon: <FileText size={16} /> },
  ];

  // Helper to get generic sections from the current document data
  const getSections = () => {
    const data = state.documentData;
    const sections = [];
    if (data.executiveSummary || data.abstract) sections.push({ id: 'summary', label: 'Summary' });
    if (data.metrics) sections.push({ id: 'metrics', label: 'Metrics' });
    if (data.highlights) sections.push({ id: 'highlights', label: 'Highlights' });
    if (data.timeline) sections.push({ id: 'timeline', label: 'Timeline' });
    if (data.findings || data.vulnerabilities) sections.push({ id: 'findings', label: 'Findings' });
    if (data.recommendations) sections.push({ id: 'recommendations', label: 'Recommendations' });
    if (data.appendix) sections.push({ id: 'appendix', label: 'Appendix' });
    return sections;
  };

  const handleExportHtml = () => {
    const el = getTemplateElement();
    exportToHtml(el, `${state.activeTemplate}.html`);
  };

  const handleExportJson = () => {
    const el = getTemplateElement();
    exportToJson(el, `${state.activeTemplate}.json`);
  };

  const getTemplateElement = () => {
    switch (state.activeTemplate) {
      case 'executive': return <ExecutiveReport data={state.documentData} sectionStyles={state.sectionStyles} theme={state.theme} />;
      case 'research': return <ResearchReport data={state.documentData} sectionStyles={state.sectionStyles} theme={state.theme} />;
      case 'security': return <SecurityAuditReport data={state.documentData} sectionStyles={state.sectionStyles} theme={state.theme} />;
      default: return <ExecutiveReport data={state.documentData} sectionStyles={state.sectionStyles} theme={state.theme} />;
    }
  };

  return (
    <div className="w-64 bg-[#FAFAFA] border-r border-[#E5E5E5] flex flex-col h-full overflow-y-auto" style={{
      width: '260px',
      backgroundColor: 'var(--color-bg)',
      borderRight: '1px solid var(--color-border)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflowY: 'auto'
    }}>
      <div style={{ padding: '20px 16px', borderBottom: '1px solid var(--color-border)' }}>
        <h2 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Documents</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {templates.map(t => (
            <button
              key={t.id}
              onClick={() => dispatch({ type: 'SET_TEMPLATE', payload: t.id })}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                borderRadius: '6px',
                border: 'none',
                background: state.activeTemplate === t.id ? '#EAEAEA' : 'transparent',
                color: state.activeTemplate === t.id ? 'var(--color-text)' : 'var(--color-text-secondary)',
                fontSize: '14px',
                fontWeight: state.activeTemplate === t.id ? 500 : 400,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease'
              }}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '20px 16px', borderBottom: '1px solid var(--color-border)' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--color-text)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
          <Palette size={14} /> Brand
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Organization Name</label>
            <input 
              type="text" 
              value={state.documentData.organization || ''} 
              onChange={(e) => dispatch({ type: 'UPDATE_DATA', payload: { path: 'organization', value: e.target.value } })}
              style={{ width: '100%', padding: '6px 8px', fontSize: '13px', border: '1px solid var(--color-border)', borderRadius: '4px', background: 'var(--color-surface)', color: 'var(--color-text)' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Accent Color</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="color" 
                value={state.theme.colors.semantic?.info || '#2563EB'} 
                onChange={(e) => {
                  dispatch({ type: 'UPDATE_THEME', payload: { colors: { ...state.theme.colors, semantic: { ...state.theme.colors.semantic, info: e.target.value } } as any } })
                }}
                style={{ width: '28px', height: '28px', padding: '0', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '13px', color: 'var(--color-text)', lineHeight: '28px' }}>{state.theme.colors.semantic?.info || '#2563EB'}</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 16px', borderBottom: '1px solid var(--color-border)' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--color-text)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
          <Settings2 size={14} /> Content Sections
        </h2>
        <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '12px' }}>Click a section to edit properties.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {getSections().map(sec => (
            <button
              key={sec.id}
              onClick={() => dispatch({ type: 'SET_SELECTED_SECTION', payload: sec.id })}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                borderRadius: '6px',
                border: 'none',
                background: state.selectedSectionId === sec.id ? 'var(--color-surface)' : 'transparent',
                color: state.selectedSectionId === sec.id ? 'var(--color-text)' : 'var(--color-text-secondary)',
                boxShadow: state.selectedSectionId === sec.id ? '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.025)' : 'none',
                fontSize: '13px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease'
              }}
            >
              <Type size={14} />
              {sec.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '20px 16px' }}>
        <h2 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Export</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button 
            onClick={handleExportHtml}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '6px', cursor: 'pointer', color: 'var(--color-text)' }}
          >
            <Download size={14} /> Export HTML
          </button>
          <button 
            onClick={handleExportJson}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '6px', cursor: 'pointer', color: 'var(--color-text)' }}
          >
            <Code size={14} /> Export Design JSON
          </button>
        </div>
      </div>

    </div>
  );
};

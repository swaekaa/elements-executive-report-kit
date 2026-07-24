import React from 'react';
import { useDocumentState } from '../hooks/useDocumentState';

export const ThemeBuilder: React.FC = () => {
  const { state, dispatch } = useDocumentState();

  const handleColorChange = (key: string, value: string) => {
    dispatch({
      type: 'UPDATE_THEME',
      payload: {
        colors: {
          ...state.theme.colors,
          [key]: value
        }
      }
    });
  };

  const handleFontChange = (key: string, value: string) => {
    dispatch({
      type: 'UPDATE_THEME',
      payload: {
        typography: {
          ...state.theme.typography,
          fontFamily: {
            ...state.theme.typography.fontFamily,
            [key]: value
          }
        }
      }
    });
  };

  return (
    <div style={{
      width: '280px',
      height: '100%',
      backgroundColor: '#F9FAFB',
      borderRight: '1px solid #E5E7EB',
      display: 'flex',
      flexDirection: 'column',
      color: '#111827',
      userSelect: 'none'
    }}>
      <div style={{
        padding: '16px',
        borderBottom: '1px solid #E5E7EB',
        fontWeight: 600,
        fontSize: '13px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span>Theme Builder</span>
        <span style={{ fontSize: '11px', color: '#6B7280', fontWeight: 500, backgroundColor: '#E5E7EB', padding: '2px 6px', borderRadius: '4px' }}>Global</span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Colors */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Brand Colors
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '12px', color: '#374151' }}>Primary</label>
              <input 
                type="color" 
                value={state.theme.colors.primary} 
                onChange={(e) => handleColorChange('primary', e.target.value)}
                style={{ width: '24px', height: '24px', padding: 0, border: '1px solid #E5E7EB', borderRadius: '4px', cursor: 'pointer' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '12px', color: '#374151' }}>Background</label>
              <input 
                type="color" 
                value={state.theme.colors.background} 
                onChange={(e) => handleColorChange('background', e.target.value)}
                style={{ width: '24px', height: '24px', padding: 0, border: '1px solid #E5E7EB', borderRadius: '4px', cursor: 'pointer' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '12px', color: '#374151' }}>Surface</label>
              <input 
                type="color" 
                value={state.theme.colors.surface} 
                onChange={(e) => handleColorChange('surface', e.target.value)}
                style={{ width: '24px', height: '24px', padding: 0, border: '1px solid #E5E7EB', borderRadius: '4px', cursor: 'pointer' }}
              />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '12px', color: '#374151' }}>Text Primary</label>
              <input 
                type="color" 
                value={state.theme.colors.textPrimary} 
                onChange={(e) => handleColorChange('textPrimary', e.target.value)}
                style={{ width: '24px', height: '24px', padding: 0, border: '1px solid #E5E7EB', borderRadius: '4px', cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>

        {/* Typography */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Typography
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '12px', color: '#374151' }}>Heading Font</label>
              <select 
                value={state.theme.typography.fontFamily.heading.split(',')[0].replace(/['"]/g, '')}
                onChange={(e) => handleFontChange('heading', `"${e.target.value}", sans-serif`)}
                style={{ padding: '6px 8px', fontSize: '12px', border: '1px solid #E5E7EB', borderRadius: '4px', outline: 'none' }}
              >
                <option value="Inter">Inter</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Georgia">Georgia</option>
                <option value="Playfair Display">Playfair Display</option>
                <option value="Roboto">Roboto</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '12px', color: '#374151' }}>Body Font</label>
              <select 
                value={state.theme.typography.fontFamily.body.split(',')[0].replace(/['"]/g, '')}
                onChange={(e) => handleFontChange('body', `"${e.target.value}", sans-serif`)}
                style={{ padding: '6px 8px', fontSize: '12px', border: '1px solid #E5E7EB', borderRadius: '4px', outline: 'none' }}
              >
                <option value="Inter">Inter</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Georgia">Georgia</option>
                <option value="Roboto">Roboto</option>
                <option value="Open Sans">Open Sans</option>
              </select>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

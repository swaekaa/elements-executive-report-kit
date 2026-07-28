import type { Block } from './types';

// Simple HTML tag stripper for plain text/MD/LaTeX
const stripHtml = (html: string) => {
  if (!html) return '';
  return html.replace(/<ul>/g, '\n').replace(/<\/ul>/g, '\n')
             .replace(/<li>/g, '- ')
             .replace(/<\/li>/g, '\n')
             .replace(/<[^>]*>?/gm, '');
};

const escapeLatex = (str: string) => {
  return str.replace(/\\/g, '\\textbackslash{}')
            .replace(/&/g, '\\&')
            .replace(/%/g, '\\%')
            .replace(/\$/g, '\\$')
            .replace(/#/g, '\\#')
            .replace(/_/g, '\\_')
            .replace(/\{/g, '\\{')
            .replace(/\}/g, '\\}')
            .replace(/~/g, '\\textasciitilde{}')
            .replace(/\^/g, '\\textasciicircum{}');
};

export function exportBlocksToMarkdown(blocks: Block[]): string {
  let md = '';

  const processBlock = (block: Block) => {
    switch (block.type) {
      case 'core/hero':
        md += `# ${block.data.title || ''}\n`;
        md += `## ${block.data.subtitle || ''}\n`;
        md += `**Author:** ${block.data.author || ''} | **Date:** ${block.data.date || ''}\n\n`;
        break;
      case 'core/section':
        md += `## ${block.data.sectionNumber ? block.data.sectionNumber + '. ' : ''}${block.data.title || ''}\n\n`;
        break;
      case 'core/paragraph':
        md += `${stripHtml(block.data.content || '')}\n\n`;
        break;
      case 'core/metric-grid':
        if (block.data.metrics) {
          block.data.metrics.forEach((m: any) => {
            md += `- **${m.label}**: ${m.value} ${m.change ? `(${m.change})` : ''}\n`;
          });
          md += '\n';
        }
        break;
      case 'core/timeline':
        if (block.data.events) {
          block.data.events.forEach((e: any) => {
            md += `- **${e.date}** - ${e.title}: ${e.description}\n`;
          });
          md += '\n';
        }
        break;
      case 'core/table':
        try {
          const headers = block.data.headers || [];
          const rows = JSON.parse(block.data.rows || '[]');
          if (headers.length > 0) {
            md += '| ' + headers.map((h:any) => h.label).join(' | ') + ' |\n';
            md += '| ' + headers.map(() => '---').join(' | ') + ' |\n';
          }
          rows.forEach((r: any) => {
            md += '| ' + r.join(' | ') + ' |\n';
          });
          md += '\n';
        } catch(e) {}
        break;
      case 'core/chart':
        md += `*[Chart: ${block.data.chartType}]*\n\n`;
        break;
    }
    if (block.children) {
      block.children.forEach(processBlock);
    }
  };

  blocks.forEach(processBlock);
  return md;
}

export function exportBlocksToLatex(blocks: Block[]): string {
  let tex = '\\documentclass{article}\n\\usepackage{booktabs}\n\\usepackage{hyperref}\n\\begin{document}\n\n';

  const processBlock = (block: Block) => {
    switch (block.type) {
      case 'core/hero':
        tex += `\\title{${escapeLatex(block.data.title || '')}}\n`;
        tex += `\\author{${escapeLatex(block.data.author || '')}}\n`;
        tex += `\\date{${escapeLatex(block.data.date || '')}}\n`;
        tex += `\\maketitle\n\n`;
        break;
      case 'core/section':
        tex += `\\section{${escapeLatex(block.data.title || '')}}\n\n`;
        break;
      case 'core/paragraph':
        tex += `${escapeLatex(stripHtml(block.data.content || ''))}\n\n`;
        break;
      case 'core/metric-grid':
        if (block.data.metrics) {
          tex += '\\begin{itemize}\n';
          block.data.metrics.forEach((m: any) => {
            tex += `  \\item \\textbf{${escapeLatex(m.label)}}: ${escapeLatex(m.value)} ${m.change ? `(${escapeLatex(m.change)})` : ''}\n`;
          });
          tex += '\\end{itemize}\n\n';
        }
        break;
      case 'core/timeline':
        if (block.data.events) {
          tex += '\\begin{itemize}\n';
          block.data.events.forEach((e: any) => {
            tex += `  \\item \\textbf{${escapeLatex(e.date)}} -- ${escapeLatex(e.title)}: ${escapeLatex(e.description)}\n`;
          });
          tex += '\\end{itemize}\n\n';
        }
        break;
      case 'core/table':
        try {
          const headers = block.data.headers || [];
          const rows = JSON.parse(block.data.rows || '[]');
          if (headers.length > 0) {
            tex += `\\begin{tabular}{${'l'.repeat(headers.length)}}\n\\toprule\n`;
            tex += headers.map((h:any) => escapeLatex(h.label)).join(' & ') + ' \\\\\n\\midrule\n';
          } else {
             if (rows.length > 0) tex += `\\begin{tabular}{${'l'.repeat(rows[0].length)}}\n\\toprule\n`;
          }
          rows.forEach((r: any) => {
            tex += r.map((c: string) => escapeLatex(c)).join(' & ') + ' \\\\\n';
          });
          tex += '\\bottomrule\n\\end{tabular}\n\n';
        } catch(e) {}
        break;
      case 'core/chart':
        tex += `\\textit{[Chart: ${escapeLatex(block.data.chartType)}]}\n\n`;
        break;
    }
    if (block.children) {
      block.children.forEach(processBlock);
    }
  };

  blocks.forEach(processBlock);
  tex += '\\end{document}';
  return tex;
}

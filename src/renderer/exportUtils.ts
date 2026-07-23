import { renderToHtml, renderToJson } from '@unlayer/react-elements';

export const exportToHtml = (element: React.ReactElement, filename: string = 'document.html') => {
  const html = renderToHtml(element);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const exportToJson = (element: React.ReactElement, filename: string = 'document.json') => {
  const json = renderToJson(element);
  const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const printIframe = (iframe: HTMLIFrameElement | null) => {
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.print();
  }
};

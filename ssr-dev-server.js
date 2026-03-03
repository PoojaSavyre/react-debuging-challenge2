import { createServer as createViteServer } from 'vite';
import express from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.SSR_PORT) || 3099;
const HOST = '127.0.0.1';

async function start() {
  const app = express();
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });
  app.use(vite.middlewares);

  const template = readFileSync(join(__dirname, 'index.html'), 'utf-8');

  app.get('*', async (req, res, next) => {
    const url = req.originalUrl;
    const pathname = url.split('?')[0];
    let initialData = {};
   
    try {
      const { render } = await vite.ssrLoadModule('/src/entry-server.jsx');
      const appHtml = await render(url, initialData);
      let html = template.replace('<!--ssr-outlet-->', appHtml);
      const preloadScript = `<script id="__PRELOAD_DATA__" type="application/json">${JSON.stringify(initialData)}</script><script>window.__PRELOADED__=document.getElementById("__PRELOAD_DATA__")?JSON.parse(document.getElementById("__PRELOAD_DATA__").textContent):undefined;</script>`;
      html = html.replace('<!--preload-data-->', preloadScript);
      const fullHtml = await vite.transformIndexHtml(url, html);
      res.setHeader('Content-Type', 'text/html').status(200).send(fullHtml);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.listen(PORT, HOST, () => {
    console.log(`SSR dev server at http://${HOST}:${PORT}`);
  });
}

start().catch((e) => {
  console.error(e);
  process.exit(1);
});

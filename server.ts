import dotenv from 'dotenv';
import express from 'express';
import LRUCache from 'lru-cache';
import next from 'next';
import path from 'path';
import { addSitemap } from './sitemap';

dotenv.config();

const port = Number(process.env.PORT) || 3000;

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dir: '.', dev });

const handle = app.getRequestHandler();

const ssrCache = new LRUCache({
  max: 100,
  maxAge: dev ? 5 : 1000 * 60 * 60, // 1hour
});

app.prepare().then(() => {
  const server = express();

  addSitemap({ server });
  // server.get('/robots.txt', express.static(join(__dirname, '/static/robots.txt')));
  server.get('/robots.txt', (req, res) => {
    app.serveStatic(req, res, path.resolve('./static/robots.txt'));
  });

  server.get('/', (req: any, res: any) => {
    renderAndCache(req, res, '/', '_');
  });

  server.get('/shop/:id', (req: any, res: any) => {
    const queryParams = { id: req.params.id };
    renderAndCache(req, res, '/shop', queryParams);
  });

  server.get('/product/:id', (req: any, res: any) => {
    const queryParams = { id: req.params.id };
    renderAndCache(req, res, '/product', queryParams);
  });

  server.get('/order/:orderId', (req: any, res: any) => {
    const queryParams = { orderId: req.params.orderId };
    renderAndCache(req, res, '/order', queryParams);
  });

  server.get('/f/:name', (req: any, res: any) => {
    const queryParams = { name: req.params.name };
    renderAndCache(req, res, '/forum', queryParams);
  });

  server.get('/u/:username', (req: any, res: any) => {
    const queryParams = { username: req.params.username };
    renderAndCache(req, res, '/user', queryParams);
  });

  server.get('/f/:name/:id', (req: any, res: any) => {
    const queryParams = { name: req.params.name, id: req.params.id };
    renderAndCache(req, res, '/forumItem', queryParams);
  });

  server.get('*', (req: any, res: any) => {
    return handle(req, res);
  });

  server.listen(port, (err: any) => {
    if (err) throw err;
    console.log(`> Ready on 🚀 http://localhost:${port}`);
  });
});

function getCacheKey(req: any) {
  return `${req.url}`;
}

function renderAndCache(req: any, res: any, pagePath: any, queryParams: any) {
  const key = getCacheKey(req);

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    res.send(ssrCache.get(key));
    return;
  }

  // If not let's render the page into HTML
  app
    .renderToHTML(req, res, pagePath, queryParams)
    .then(html => {
      // Let's cache this page
      ssrCache.set(key, html);

      res.send(html);
    })
    .catch(err => {
      app.renderError(err, req, res, pagePath, queryParams);
    });
}

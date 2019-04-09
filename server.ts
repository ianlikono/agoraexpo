import dotenv from 'dotenv';
import express from 'express';
import LRUCache from 'lru-cache';
import next from 'next';

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

  server.get('*', (req: any, res: any) => {
    return handle(req, res);
  });

  server.listen(port, (err: any) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
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

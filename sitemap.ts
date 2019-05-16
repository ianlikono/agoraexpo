import * as sm from 'sitemap';

// @ts-ignore
const sitemap = sm.createSitemap({
  cacheTime: 600000, // 600 sec - cache purge period
  hostname: 'https://agoraexpo.com',
});

const addSitemap = ({ server }) => {
  sitemap.add({
    changefreq: 'daily',
    priority: 1,
    url: `/`,
  });

  sitemap.add({
    changefreq: 'monthly',
    priority: 0.9,
    url: '/about',
  });

  sitemap.add({
    changefreq: 'monthly',
    priority: 0.9,
    url: '/auth',
  });
  sitemap.add({
    changefreq: 'monthly',
    priority: 1,
    url: '/create-forum',
  });
  sitemap.add({
    changefreq: 'monthly',
    priority: 1,
    url: '/create-post',
  });
  sitemap.add({
    changefreq: 'daily',
    priority: 1,
    url: '/forum',
  });
  sitemap.add({
    changefreq: 'daily',
    priority: 1,
    url: '/forumItem',
  });
  sitemap.add({
    changefreq: 'daily',
    priority: 1,
    url: '/forums',
  });
  sitemap.add({
    changefreq: 'monthly',
    priority: 1,
    url: '/new-shop',
  });
  sitemap.add({
    changefreq: 'daily',
    priority: 1,
    url: '/product',
  });
  sitemap.add({
    changefreq: 'daily',
    priority: 1,
    url: '/shop',
  });
  sitemap.add({
    changefreq: 'daily',
    priority: 1,
    url: '/user',
  });
  // Note {} in next line is a placeholder filling the spot where the req parameter
  // would normally be listed (but isn't listed here since we aren't using it)
  server.get('/sitemap.xml', ({}, res) => {
    sitemap.toXML((err, xml) => {
      if (err) {
        res.status(500).end();
        return;
      }
      res.header('Content-Type', 'application/xml');
      res.send(xml);
    });
  });
};

export { addSitemap };

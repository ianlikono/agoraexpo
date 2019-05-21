const withCSS = require('@zeit/next-css');
const withTypescript = require('@zeit/next-typescript');

module.exports = withTypescript(
  withCSS({
    webpack(config) {
      const originalEntry = config.entry
      config.entry = async () => {
        const entries = await originalEntry()

        if (
          entries['main.js'] &&
          !entries['main.js'].includes('./lib/polyfills.js')
        ) {
          entries['main.js'].unshift('./lib/polyfills.js')
        }

        return entries
      }
      config.module.rules.push({
        test: /\.(svg|eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            name: '[name].[ext]',
          },
        },
      });
      return config;
    },
  })
);

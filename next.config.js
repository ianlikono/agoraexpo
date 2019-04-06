const withCSS = require('@zeit/next-css');
const withTypescript = require('@zeit/next-typescript');

module.exports = withTypescript(
  withCSS({
    webpack(config) {
      config.module.rules.push({
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
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

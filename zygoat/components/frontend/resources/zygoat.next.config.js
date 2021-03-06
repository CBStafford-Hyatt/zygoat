// This file is automatically generated and updated by Zygoat and should not
// be edited manually. To extend or overwrite these settings, edit
// next.config.js

const { ESBuildMinifyPlugin } = require('esbuild-loader');

const withSvgr = require('next-svgr');
const withImages = require('next-images');

const prod = process.env.NODE_ENV === 'production';

const headers = [
  { key: 'X-FRAME-Options', value: 'DENY' },
  { key: 'Content-Security-Policy', value: "frame-ancestors 'none'" },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  { key: 'Cache-Control', value: 'no-cache, no-store' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
];

function useEsbuildMinify(config, options) {
  const terserIndex = config.optimization.minimizer.findIndex(
    minimizer => minimizer.constructor.name === 'TerserPlugin',
  );
  if (terserIndex > -1) {
    config.optimization.minimizer.splice(terserIndex, 1, new ESBuildMinifyPlugin(options));
  }
}

function useEsbuildLoader(config, options) {
  const jsLoader = config.module.rules.find(rule => rule.test && rule.test.test('.js'));

  if (jsLoader) {
    jsLoader.use.loader = 'esbuild-loader';
    jsLoader.use.options = options;
  }
}

const config = {
  webpack: (webpackConfig, { webpack }) => {
    webpackConfig.resolve.alias['@@'] = __dirname;
    webpackConfig.resolve.alias['@wui'] = '@bequestinc/wui';

    webpackConfig.plugins.push(
      new webpack.ProvidePlugin({
        React: 'react',
      }),
    );

    useEsbuildMinify(webpackConfig);

    useEsbuildLoader(webpackConfig, {
      loader: 'jsx',
      target: 'es2015',
    });

    return webpackConfig;
  },
  env: {
    PROD: prod,
  },
  headers: async () => [
    {
      source: '/:path*',
      // This file does not get compiled
      // eslint-disable-next-line object-shorthand
      headers: headers,
    },
    {
      source: '/',
      // eslint-disable-next-line object-shorthand
      headers: headers,
    },
  ],
};

const withImagesConfig = {
  exclude: /\.svg$/,
};

const plugins = [withSvgr, [withImages, withImagesConfig]];

module.exports = { plugins, config };

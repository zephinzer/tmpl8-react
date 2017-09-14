const path = require('path');

const {
  CONF_BUILD,
  CONF_DEV,
  CONF_PRD,
  DEFAULT_SERVER_PORT,
} = require('./constant');
const CONST_WEBPACK = 'webpack';
const NA_STRING = 'not in use';
const NA_ARRAY = [NA_STRING];
const NA_OBJECT = {message: NA_STRING};

const serverPort = process.env.PORT || DEFAULT_SERVER_PORT;

module.exports = (function() {
  const env = getEnv(process.env);
  console.info('WEBPACK ENVIRONMENT:', env);
  const config = {
    webpackCompiler: {
      context: _context(),
      devtool: _devtool(env),
      entry: _entry(env),
      module: _module(env),
      output: _output(env),
      plugins: _plugins(env),
    },
  };
  console.info('\tpublicPath:', config.webpackCompiler.output.publicPath);
  console.info('\tfilename:', config.webpackCompiler.output.filename);
  config.middleware = {
    dev: {
      noInfo: false,
      publicPath: config.webpackCompiler.output.publicPath,
    },
    hot: {
      noInfo: false,
      path: '/__webpack_hmr',
      publicPath: config.webpackCompiler.output.publicPath,
    },
  };
  return config;
})();

function getEnv(processEnv) {
  const calledFromWebpackBuild =
    (processEnv._.indexOf(CONST_WEBPACK) ===
      (processEnv._.length - CONST_WEBPACK.length));
  const justUseProductionPlease =
    (processEnv.USE_PRODUCTION == 1);
  if(calledFromWebpackBuild || justUseProductionPlease) {
    return CONF_BUILD;
  } else {
    switch (processEnv.NODE_ENV) {
      case 'prd': case 'production':
        return CONF_PRD;
      default:
        return CONF_DEV;
    }
  }
};

function _context() {
  return path.join(__dirname, '..');
};

function _devtool(env) {
  switch (env) {
    case CONF_DEV:
      return 'inline-source-map';
    default:
      return 'cheap-module-source-map';
  }
};

function _entry(env) {
  const _entryCommons = [
    'babel-polyfill',
    'react',
    'redux',
    'react-redux',
    'react-router',
  ];
  switch (env) {
    case CONF_DEV:
      return {
        vendor: [
        ].concat(_entryCommons),
        bundle: [
          'webpack-hot-middleware/client?path=/__webpack_hmr',
          'react-hot-loader/patch',
          path.join(__dirname, '../src/index.js'),
        ],
      };
    case CONF_BUILD:
      return {
        vendor: [
        ].concat(_entryCommons),
        bundle: [
          path.join(__dirname, '../src/index.js'),
        ],
      };
    default:
      return NA_ARRAY;
  }
}

function _module(env) {
  switch (env) {
    case CONF_DEV:
      return {
        rules: [
          {
            test: /\.js$/,
            loader: 'react-hot-loader/webpack',
            exclude: /node_modules/,
          },
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
              plugins: [
                'transform-react-jsx',
                'root-import',
              ],
              presets: [
                'es2015',
                'react',
                'stage-0',
              ],
            },
          },
          {
            test: /\.(scss|css)$/,
            use: [
              {
                loader: 'style-loader',
              },
              {
                loader: 'css-loader',
              },
              {
                loader: 'sass-loader',
              },
            ],
          },
        ],
      };
    case CONF_BUILD:
      return {
        rules: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
              plugins: [
                'transform-react-jsx',
                'root-import',
              ],
              presets: [
                'es2015',
                'react',
                'stage-0',
              ],
            },
          },
          {
            test: /\.(scss|css)$/,
            use: [
              {
                loader: 'style-loader',
              },
              {
                loader: 'css-loader',
              },
              {
                loader: 'sass-loader',
              },
            ],
          },
        ],
      };
    default:
      return NA_OBJECT;
  };
};

function _output(env) {
  switch (env) {
    case CONF_DEV:
      return {
        path: path.join(__dirname, '../assets/build'),
        filename: '[name].js',
        publicPath: '/assets/build/',
      };
    case CONF_BUILD:
      return {
        path: path.join(__dirname, '../assets/build'),
        filename: '[name].min.js',
        chunkFilename: '[id].chunk.js',
        publicPath: '/assets/build/',
      };
    default:
      return NA_OBJECT;
  }
};

function _plugins(env) {
  switch (env) {
    case CONF_DEV:
      const webpackDevelopment = require('webpack');
      return [
        new webpackDevelopment.HotModuleReplacementPlugin(),
        new webpackDevelopment.NamedModulesPlugin(),
        new webpackDevelopment.optimize.OccurrenceOrderPlugin(),
      ];
    case CONF_BUILD:
      const webpack = require('webpack');
      const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
      const CompressionPlugin = require('compression-webpack-plugin');
      const initialPluginsObject = process.env.WEBPACK_BUNDLE_ANALYZER ?
        [BundleAnalyzerPlugin] : [];
      return initialPluginsObject.concat(
        [
          new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
          }),
          new webpack.optimize.OccurrenceOrderPlugin(),
          new webpack.optimize.AggressiveMergingPlugin(),
          new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'common.min.js',
            minChunks: 2,
          }),
          new webpack.optimize.UglifyJsPlugin({
            comments: false,
            sourceMap: true,
          }),
          new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.(js|html)$/,
            minRatio: 0.8,
          }),
        ]
      );
    default:
      return NA_ARRAY;
  }
};

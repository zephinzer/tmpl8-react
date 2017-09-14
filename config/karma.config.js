const path = require('path');

module.exports = function(config) {
  config.set({
    basePath: path.join(process.cwd(), '/src'),
    browsers: ['PhantomJS'],
    browserDisconnectTimeout: 1000 * 60 * 10,
    colors: true,
    coverageReporter: {
      reporters: [
        {
          type: 'text',
        },
        {
          type: 'lcov',
          dir: path.join(process.cwd(), '/assets/coverage'),
          subdir: 'karma',
        },
      ],
    },
    files: [
      '../node_modules/babel-polyfill/dist/polyfill.js',
      {pattern: '*.test.js', watched: false, included: true, served: true},
      {pattern: '**/*.test.js', watched: false, included: true, served: true},
    ],
    preprocessors: {
      '*.test.js': [
        'webpack',
        'sourcemap',
      ],
      '**/*.test.js': [
        'webpack',
        'sourcemap',
      ],
    },
    plugins: [
      'karma-coverage',
      'karma-mocha',
      'karma-sinon-chai',
      'karma-phantomjs-launcher',
      'karma-sourcemap-loader',
      'karma-webpack',
    ],
    frameworks: ['mocha', 'sinon-chai'],
    logLevel: config.LOG_INFO,
    reporters: [
      'dots',
      'coverage',
    ],
    webpack: {
      devtool: 'inline-source-map',
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            options: {
              presets: [
                'react',
                ['es2015', {modules: false}],
                'stage-0',
              ],
              plugins: [
                'transform-react-jsx',
                'root-import',
                ['istanbul', {
                  exclude: [
                    '**/*.test.js',
                    '**/index.js',
                    'index.js',
                  ],
                }],
              ],
            },
          },
        ],
      },
    },
    webpackServer: {
      noInfo: false,
      progress: true,
    },
  });
};

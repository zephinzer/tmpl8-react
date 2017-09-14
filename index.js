const path = require('path');

const ejs = require('ejs');
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');

const {
  CONF_DEV,
  CONF_PRD,
  DEFAULT_SERVER_PORT,
} = require('./config/constant');

const developmentMode = (
  typeof process.env.NODE_ENV === 'undefined' ||
  process.env.NODE_ENV === CONF_DEV ||
  process.env.NODE_ENV !== CONF_PRD
);
const serverPort = process.env.PORT || DEFAULT_SERVER_PORT;

// set up process logging
const logger = require('./config/logger.config')();

console.info('SERVER ENVIRONMENT:', developmentMode ? CONF_DEV : CONF_PRD);

// initialise main server
const server = express();
module.exports = server;

// set up views engine to use embedded javascript (ejs)
const pathToViews = path.join(__dirname);
const viewExtension = 'html';
const viewIndexFilename = 'index';
server.set('view engine', viewExtension);
server.engine(viewExtension, ejs.renderFile);
server.set('views', pathToViews);

// set up basic http header security
server.use(helmet());

// set up gzip capabilities
server.use(compression());

// set up request logging
server.use(morgan(logger.morgan.format, logger.morgan.stream));

if(developmentMode) {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('./config/webpack.config');
  const webpackCompiler = webpack(webpackConfig.webpackCompiler);
  server.use(webpackDevMiddleware(webpackCompiler, webpackConfig.middleware.dev));
  server.use(webpackHotMiddleware(webpackCompiler, webpackConfig.middleware.hot));
}

// set up assets pipeline
const pathToAssets = path.join(__dirname, '/assets');
server.use('/assets', express.static(pathToAssets));

// set up main react entry point
const reactConfig = require('./config/react-entrypoint.config');
server.get('/*', function(req, res, next) {
  res.render(viewIndexFilename, Object.assign({}, reactConfig,
    {
      env: developmentMode ? CONF_DEV : CONF_PRD,
    }
  ));
});

// listen!
if(!module.parent) {
  server.listen(serverPort);
}

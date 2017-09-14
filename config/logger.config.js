let path = require('path');
let {CONF_PRD} = require('./constant');
let LOG_KEYS = {
  ACCESS: 'access',
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
  RANT: 'rant',
};

let LOG_LEVELS = {
  [LOG_KEYS.ACCESS]: 1,
  [LOG_KEYS.ERROR]: 2,
  [LOG_KEYS.WARN]: 3,
  [LOG_KEYS.INFO]: 4,
  [LOG_KEYS.DEBUG]: 5,
  [LOG_KEYS.RANT]: 7,
};

let LOG_COLORS = {
  [LOG_KEYS.ACCESS]: 'cyan',
  [LOG_KEYS.ERROR]: 'red',
  [LOG_KEYS.WARN]: 'yellow',
  [LOG_KEYS.INFO]: 'green',
  [LOG_KEYS.DEBUG]: 'blue',
  [LOG_KEYS.RANT]: 'gray',
};

let LOG_DATE_PATTERN = 'yyyyMMdd_';

let LOG_PATH_EXISTS = (typeof process.env.LOG_PATH === 'string');
let LOG_PATH = LOG_PATH_EXISTS ? process.env.LOG_PATH : path.join(process.cwd(), './logs');

let logger = null;
module.exports = function() {
  if (logger === null) {
    logger = initializeWinston();
  }
  mapConsoleToLogger(logger, [
    {from: LOG_KEYS.ACCESS, to: LOG_KEYS.ACCESS},
    {from: LOG_KEYS.ERROR, to: LOG_KEYS.ERROR},
    {from: LOG_KEYS.WARN, to: LOG_KEYS.WARN},
    {from: LOG_KEYS.INFO, to: LOG_KEYS.INFO},
    {from: 'log', to: LOG_KEYS.DEBUG},
    {from: LOG_KEYS.RANT, to: LOG_KEYS.RANT},
  ]);
  return {
    winston: logger,
    morgan: {
      format: _format(),
      stream: {
        write: function(message, encoding) {
          logger[LOG_KEYS.ACCESS](message);
        },
      },
    },
  };
};

function _format() {
  switch (process.env.NODE_ENV) {
    case CONF_PRD:
      return '{"level":"access","status"::status,"method":":method","url":":url","remoteAddr":":remote-addr"}';
    default:
      return 'dev';
  }
}

function mapConsoleToLogger(loggerObject, mappings) {
  mappings.forEach((mapping) => {
    console[mapping.from] = loggerObject[mapping.to];
  });
}

function initializeWinston() {
  let winston = require('winston');
  require('winston-daily-rotate-file');
  let logger = new winston.Logger({levels: LOG_LEVELS});
  winston.addColors(LOG_COLORS);
  logger.add(winston.transports.Console, {
    colorize: true,
    exitOnError: false,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    level: LOG_KEYS.RANT,
  });

  Object.keys(LOG_KEYS).forEach(function(logLevel) {
    let level = LOG_KEYS[logLevel];
    let filename = path.join(LOG_PATH, `./${level}.log`);
    logger.add(winston.transports.DailyRotateFile, {
      name: `${level}`,
      prepend: true,
      datePattern: LOG_DATE_PATTERN,
      filename,
      level,
      // exitOnError: false,
      // handleExceptions: true,
      // humanReadableUnhandledException: true,
    });
    logger[level](`Winston FILE logger initialized for ${logLevel} at:\n\t${filename}.`);
  });

  return logger;
};

let {CONF_DEV, CONF_PRD} = require('./constant');

exports = module.exports = {
  entrypointId: 'entry-point',
  scriptIncludes: {
    [CONF_DEV]: [
      '/assets/build/vendor.js',
      '/assets/build/bundle.js',
    ],
    [CONF_PRD]: [
      '/assets/build/common.min.js',
      '/assets/build/vendor.min.js',
      '/assets/build/bundle.min.js',
    ],
  },
};

const constant = require('../../config/constant');

describe('config/constant', () => {
  it('has the correct keys', () => {
    expect(constant).to.contain.keys([
      'APP_NAME',
      'CONF_BUILD',
      'CONF_DEV',
      'CONF_PRD',
      'DEFAULT_SERVER_PORT',
    ]);
  });
});

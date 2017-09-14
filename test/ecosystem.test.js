const CONSTANTS = require('../config/constant');
const ecosystem = require('../ecosystem');

describe('config/ecosystem', () => {
  it('contains PM2 configurations', () => {});

  it('contains one app configuration', () => {
    expect(ecosystem.apps).to.have.length(1);
  });

  it('has an app named from the package.json file', () => {
    expect(ecosystem.apps[0].name).to.eql(CONSTANTS.APP_NAME);
  });

  describe('development environment', () => {
    const env = ecosystem.apps[0].env;

    it('logs to "./logs" relative to root folder', () => {
      expect(env.LOG_PATH).to.eql('./logs');
    });

    it('runs with NODE_ENV "dev"', () => {
      expect(env.NODE_ENV).to.eql('dev');
    });

    it('defaults to port 3333', () => {
      expect(env.PORT).to.eql(3333);
    });
  });

  describe('production environment', () => {
    const env = ecosystem.apps[0].env_production;

    it('logs to a system folder in "/var/log" using the application name', () => {
      expect(env.LOG_PATH).to.eql(`/var/log/${CONSTANTS.APP_NAME}`);
    });

    it('runs with NODE_ENV "dev"', () => {
      expect(env.NODE_ENV).to.eql('prd');
    });

    it('defaults to port 3334', () => {
      expect(env.PORT).to.eql(3334);
    });
  });
});

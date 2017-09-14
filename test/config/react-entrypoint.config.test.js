const {CONF_DEV, CONF_PRD} = require('../../config/constant');
const component = require('../../config/react-entrypoint.config');

describe('config/react-entrypoint', () => {
  it('defines an entrypointId', () => {
    expect(component).to.include.key('entrypointId');
  });

  it('defines script includes for development and production builds', () => {
    expect(component).to.include.key('scriptIncludes');
    expect(component.scriptIncludes).to.contain.keys([
      CONF_DEV,
      CONF_PRD,
    ]);
  });
});

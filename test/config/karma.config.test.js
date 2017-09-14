const path = require('path');
const karma = require('../../config/karma.config');

describe('config/karma', () => {
  let configuration = null;
  
  before(() => {
    karma({set: function(_configuration) {
      configuration = _configuration;
    }});
  });

  it('sets the correct basePath', () => {
    expect(configuration.basePath).to.eql(
      path.join(process.cwd(), '/src')
    );
  });

  it('has a coverage reporter', () => {
    expect(configuration.reporters).to.contain('coverage');
  });
});

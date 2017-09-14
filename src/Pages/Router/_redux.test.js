import {push} from 'react-router-redux';
import routerDuck, {history, middleware, reducer, dispatchers} from './_redux';

describe('PageRouter/redux', () => {
  it('exports the expected parameters', () => {
    expect(routerDuck).to.contain.keys([
      'history',
      'middleware',
      'reducer',
      'dispatchers',
    ]);
  });

  it('exports the same parameters via default and via individual exports', () => {
    expect(routerDuck.history).to.eql(history);
    expect(routerDuck.middleware).to.eql(middleware);
    expect(routerDuck.reducer).to.eql(reducer);
    expect(routerDuck.dispatchers).to.eql(dispatchers);
  });

  describe('dispatchers', () => {
    const dispatch = sinon.spy();
    const dispatcher = dispatchers(dispatch);

    it('has a linkTo property that calls the dispatch', () => {
      dispatcher.linkTo('/');
      expect(dispatch).to.be.calledWith(push('/'));
    });
  });
});

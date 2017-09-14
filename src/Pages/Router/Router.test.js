import React from 'react';
import {shallow} from 'enzyme';
import Router, {asyncPages, asyncLoadComplete, renderIfNotNull} from '~/src/Pages/Router/Router';

describe('Router', () => {
  let component = null;

  before(() => {
    component = shallow(<Router />);
  });

  it('renders', () => {
    expect(component).to.be.okay;
  });

  describe('asyncLoadComplete', () => {
    const forceUpdate = sinon.spy();
    const expectedComponent = (class x extends React.Component {});
    it('calls forceUpdate', () => {
      const bound = {Component: null, forceUpdate};
      asyncLoadComplete.bind(bound)(expectedComponent);
      expect(forceUpdate).to.be.calledOnce;
      expect(bound.Component).to.eql(expectedComponent);
    });
  });

  describe('renderIfNotNull', () => {
    function expectedClass(props) {
      return (<div></div>);
    };
    expectedClass.default = expectedClass;

    it('returns null if supplied argument resolves to false', () => {
      expect(renderIfNotNull()).to.eql(null);
    });

    it('returns the component if supplied argument resolves to a component', () => {
      expect(renderIfNotNull(expectedClass)).to.eql(<expectedClass.default />);
    });
  });

  describe('asyncPages', () => {
    let pages = asyncPages;

    context('home page', () => {
      let page = null;

      before(() => {
        page = pages.find((page) => (page.path === '/'));
      });

      it('has the right path', () => {
        expect(page).to.not.be.null;
      });

      it('can be rendered', () => {
        expect(() => {
          shallow(<page.component />);
        }).to.not.throw();
      });
    });

    context('discover page', () => {
      let page = null;

      before(() => {
        page = pages.find((page) => (page.path === '/discover'));
      });

      it('has the right path', () => {
        expect(page).to.not.be.null;
      });

      it('can be rendered', () => {
        expect(() => {
          shallow(<page.component />);
        }).to.not.throw();
      });
    });
  });
});

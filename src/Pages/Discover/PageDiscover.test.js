import React from 'react';
import {shallow} from 'enzyme';
import {PageDiscover} from '~/src/Pages/Discover/PageDiscover';

describe('PageDiscover', () => {
  let component = null;

  before(() => {
    component = shallow(<PageDiscover />);
  });

  it('renders', () => {
    expect(component).to.be.okay;
  });
  
    it('calls props.linkTo when clicked', () => {
      const linkTo = sinon.spy();
      component.setProps({linkTo});
      const anchorLink = component.find('a');
      expect(anchorLink).to.have.length(1);
      anchorLink.simulate('click');
      expect(linkTo).to.be.calledOnce;
    });
});

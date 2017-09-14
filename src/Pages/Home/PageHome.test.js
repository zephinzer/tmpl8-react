import React from 'react';
import {shallow} from 'enzyme';
import {PageHome} from '~/src/Pages/Home/PageHome';

describe('PageHome', () => {
  let component = null;

  before(() => {
    component = shallow(<PageHome />);
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

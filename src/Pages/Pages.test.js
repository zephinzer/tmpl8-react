import React from 'react';
import {shallow} from 'enzyme';
import Pages from './Pages';
import PageRouter from './Router';

describe('Pages', () => {
  let component = null;

  before(() => {
    component = shallow(<Pages />);
  });

  it('renders correctly', () => {
    expect(component.find(PageRouter)).to.have.length(1);
  });
});

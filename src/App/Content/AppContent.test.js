import React from 'react';
import {shallow} from 'enzyme';
import AppContent from '~/src/App/Content/AppContent';

describe('AppContent', () => {
  let component =null;

  before(() => {
    component = shallow(<AppContent />);
  });

  it('renders', () => {
    expect(component).to.be.okay;
  });
});

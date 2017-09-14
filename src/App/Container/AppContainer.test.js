import React from 'react';
import {shallow} from 'enzyme';
import AppContainer from '~/src/App/Container/AppContainer';

describe('AppContainer', () => {
  const expectedContent = 'expected content';
  let component = null;

  before(() => {
    component = shallow(
      <AppContainer>
        {expectedContent}
      </AppContainer>
    );
  });

  it('renders', () => {
    expect(component).to.be.okay;
  });

  it('renders all children', () => {
    expect(component.prop('children')).to.equal(expectedContent);
  });
});

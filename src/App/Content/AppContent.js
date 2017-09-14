import React from 'react';
import Pages from '~/src/Pages';
import {Provider} from 'react-redux';
import {store} from '~/src/Flux';

export default class AppContent extends React.Component {
  constructor(props) {
    super(props);
    this.store = store;
  }

  render() {
    return (
      <div className="app-content">
        <Provider store={this.store}>
          <Pages />
        </Provider>
      </div>
    );
  }
};

import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './App/Container';
import AppContent from './App/Content';
import reactEntrypointConfig from '~/config/react-entrypoint.config';

const entrypoint = document.getElementById(reactEntrypointConfig.entrypointId);

if(entrypoint) {
  const render = (Component) => {
    ReactDOM.render(
      <AppContainer>
        <Component />
      </AppContainer>,
      entrypoint
    );
  };
  if(module.hot) {
    module.hot.accept('./App/Content', () => {
      render(require('./App/Content').default);
    });
  }
  render(AppContent);
} else {
  console.error(`[tmpl8] an element named '${reactEntrypointConfig.entrypointId}' could not be found.`);
}

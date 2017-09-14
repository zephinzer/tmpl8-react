import React from 'react';
import PageRouter from './Router';

export default class Pages extends React.Component {
  render() {
    return (
      <div className="pages">
        <PageRouter />
      </div>
    );
  }
};

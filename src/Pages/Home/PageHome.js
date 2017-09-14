import React from 'react';
import {connectComponent} from '~/src/Flux';

export function PageHome(props) {
  return (
    <div className="page-home">
      PageHomess
      <br />
      <a onClick={(() => {
        props.linkTo('/discover');
      })}>Go to PageDiscover</a>
    </div>
  );
};

export default connectComponent(PageHome);

import React from 'react';
import {connectComponent} from '~/src/Flux';

export function PageDiscover(props) {
  return (
    <div className="page-discover">
      PageDiscover
      <br />
      <a onClick={(() => {
        props.linkTo('/');
      })}>Go to PageHome</a>
    </div>
  );
};

export default connectComponent(PageDiscover);

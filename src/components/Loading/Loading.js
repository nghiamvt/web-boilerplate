import React from 'react';
import { Loader, Dimmer } from 'semantic-ui-react';

const Loading = () => {
  return (
    <Dimmer active>
      <Loader>Loading</Loader>
    </Dimmer>
  );
};

export default Loading;

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../../src/client/containers/App';
import Main from '../../src/client/containers/Main';
import Qwerty from '../../src/client/containers/Qwerty';


export default (store) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(store);
  }
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Main} />
      <Route path="qwerty" component={Qwerty} />
    </Route>
    );
};

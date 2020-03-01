import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Header } from 'components/Header';
import { Content } from 'components/Content';

import { Home } from 'containers/Home';
import { Encrypt } from 'containers/Encrypt';
import { Decrypt } from 'containers/Decrypt';
import { Checksum } from 'containers/Checksum';
import { NotFound } from 'containers/NotFound';

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL || ''}>
      <Header />
      <Content>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/encrypt/" component={Encrypt} />
          <Route path="/decrypt/" component={Decrypt} />
          <Route path="/checksum/" component={Checksum} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Content>
    </BrowserRouter>
  );
};

export default App;

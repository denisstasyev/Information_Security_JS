import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Header } from 'components/Header';
import { Content } from 'components/Content';

import { Home } from 'containers/Home';
import { Encrypt } from 'containers/Encrypt';
import { Decrypt } from 'containers/Decrypt';
import { Checksum } from 'containers/Checksum';

import { homepage } from 'config';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Content>
        <Switch>
          <Route exact path={homepage} component={Home} />
          <Route path={homepage + '/encrypt'} component={Encrypt} />
          <Route path={homepage + '/decrypt'} component={Decrypt} />
          <Route path={homepage + '/checksum'} component={Checksum} />
        </Switch>
      </Content>
    </BrowserRouter>
  );
};

export default App;

import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Header } from 'components/Header';
import { Content } from 'components/Content';
import { Footer } from 'components/Footer';

import { Home } from 'containers/Home';

import { Encrypt } from 'containers/Encrypt';
import { Decrypt } from 'containers/Decrypt';

import { BasicEncrypt } from 'containers/Encrypt/Basic';
import { BasicDecrypt } from 'containers/Decrypt/Basic';

import { BlockEncrypt } from 'containers/Encrypt/Block';
import { BlockDecrypt } from 'containers/Decrypt/Block';

import { Checksum } from 'containers/Checksum';
import { Hashing } from 'containers/Hashing';
import { NotFound } from 'containers/NotFound';

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL || ''}>
      <Header />
      <Content>
        <Switch>
          <Route exact path="/" component={Home} />

          <Route exact path="/encrypt/" component={Encrypt} />
          <Route exact path="/decrypt/" component={Decrypt} />

          <Route path="/encrypt/basic" component={BasicEncrypt} />
          <Route path="/decrypt/basic" component={BasicDecrypt} />

          <Route path="/encrypt/block" component={BlockEncrypt} />
          <Route path="/decrypt/block" component={BlockDecrypt} />

          <Route path="/checksum/" component={Checksum} />
          <Route path="/hash/" component={Hashing} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Content>
      <Footer />
    </BrowserRouter>
  );
};

export default App;

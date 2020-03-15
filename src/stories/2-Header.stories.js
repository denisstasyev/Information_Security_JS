import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Header } from 'components/Header';

export default {
  title: 'Header',
  component: Header,
};

export const Example = () => (
  <BrowserRouter>
    <Header />
  </BrowserRouter>
);

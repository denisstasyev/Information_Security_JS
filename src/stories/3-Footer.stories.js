import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Footer } from 'components/Footer';

export default {
  title: 'Footer',
  component: Footer,
};

export const Example = () => (
  <BrowserRouter>
    <Footer />
  </BrowserRouter>
);

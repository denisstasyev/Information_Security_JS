import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Tag } from 'components/Tag';

export default {
  title: 'Tag',
  component: Tag,
};

const activeLink = { title: 'Активный тег', href: '/link', isActive: true };
const inactiveLink = { title: 'Неактивный тег', href: '/link', isActive: false };

export const Active = () => (
  <BrowserRouter>
    <Tag link={activeLink} />
  </BrowserRouter>
);
export const Inactive = () => (
  <BrowserRouter>
    <Tag link={inactiveLink} />
  </BrowserRouter>
);

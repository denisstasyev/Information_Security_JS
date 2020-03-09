import React from 'react';

import { ContentBox } from 'components/ContentBox';

export default {
  title: 'ContentBox',
  component: ContentBox,
};

export const Example = () => (
  <ContentBox title="Заголовок">
    <div>Хорошо отображаемый контент как на ПК, так и на смартфоне</div>
  </ContentBox>
);

import React from 'react';

import { Alarm } from 'components/Alarm';

export default {
  title: 'Alarm',
  component: Alarm,
};

export const News = () => <Alarm type="news" text="Текст предупреждения" />;
export const Error = () => <Alarm type="error" text="Текст ошибки" />;

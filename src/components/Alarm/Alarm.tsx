import * as React from 'react';

import styles from './alarm.module.scss';

enum Types {
  news = 'alarm-news',
  error = 'alarm-error',
}

interface AlarmProps {
  type: keyof typeof Types;
  text: string;
}

export default function(props: AlarmProps) {
  return <div className={styles[Types[props.type]]}>{props.text}</div>;
}

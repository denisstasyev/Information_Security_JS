import * as React from 'react';

import styles from './content-box.module.scss';

interface ContentBoxProps {
  title: string;
  children: any;
}

export default function(props: ContentBoxProps) {
  return (
    <div className={styles['content-box']}>
      <h2 className={styles['title']}>{props.title}</h2>
      {props.children}
    </div>
  );
}

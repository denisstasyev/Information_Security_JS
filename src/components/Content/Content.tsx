import * as React from 'react';

import styles from './content.module.scss';

export default function(props: any) {
  return <div className={styles['content']}>{props.children}</div>;
}

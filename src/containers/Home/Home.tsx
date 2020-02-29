import * as React from 'react';

import styles from './home.module.scss';

import { Tag } from 'components/Tag';

export default function() {
  return (
    <>
      <h2>Добро пожаловать на наш сайт!</h2>
      <div className={styles['text']}>
        Сейчас вы можете
        <div className={styles['tag']}>
          <Tag link={{ title: 'зашифровать', href: '/encrypt', isActive: true }} />
        </div>
        и
        <div className={styles['tag']}>
          <Tag link={{ title: 'расшифровать', href: '/decrypt', isActive: true }} />
        </div>
        сообщение, а также
        <div className={styles['tag']}>
          <Tag link={{ title: 'проверить его целостность', href: '/checksum', isActive: true }} />
        </div>
      </div>
      <br />
      <br />
      <div className={styles['text']}>
        Скоро появится
        <div className={styles['tag']}>
          <Tag link={{ title: 'хеширование', href: '/hash', isActive: false }} />
        </div>
      </div>
    </>
  );
}

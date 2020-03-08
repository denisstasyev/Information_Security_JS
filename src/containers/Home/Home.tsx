import * as React from 'react';

import styles from './home.module.scss';

import { ContentBox } from 'components/ContentBox';
import { Alarm } from 'components/Alarm';
import { Tag } from 'components/Tag';

export default function() {
  return (
    <ContentBox title="Добро пожаловать на наш сайт &#128515;!">
      <Alarm
        type="news"
        text="Теперь у нас вы можете использовать Emoji в качестве ключей шифрования &#128522;!"
      />
      <br />
      <div className={styles['text']}>
        Сейчас вы можете
        <div className={styles['tag']}>
          <Tag link={{ title: 'зашифровать', href: '/encrypt/', isActive: true }} />
        </div>
        и
        <div className={styles['tag']}>
          <Tag link={{ title: 'расшифровать', href: '/decrypt/', isActive: true }} />
        </div>
        сообщение, а также
        <div className={styles['tag']}>
          <Tag
            link={{ title: 'посчитать контрольную сумму', href: '/checksum/', isActive: true }}
          />
        </div>
        для него.
      </div>
      <br />
      <div className={styles['text']}>
        Скоро появится
        <div className={styles['tag']}>
          <Tag link={{ title: 'хеширование', href: '/hash/', isActive: false }} />
        </div>
        .
      </div>
    </ContentBox>
  );
}

import * as React from 'react';

import styles from './home.module.scss';

import { ContentBox } from 'components/ContentBox';
import { Alarm } from 'components/Alarm';
import { Tag } from 'components/Tag';

import { mainLinks } from 'config';

export default function() {
  return (
    <ContentBox title='Добро пожаловать на спецпроект "Шифровальщик"!'>
      <Alarm
        type="news"
        text="Теперь у нас вы можете использовать Emoji в качестве ключей шифрования &#128522;!"
      />
      <br />
      <span>Сейчас доступны следующие возможности:</span>
      <ul>
        {mainLinks.map((link, index) => (
          <li key={index}>
            <div className={styles['tag']}>
              <Tag link={link} />
            </div>
          </li>
        ))}
      </ul>
    </ContentBox>
  );
}

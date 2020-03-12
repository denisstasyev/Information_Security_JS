import * as React from 'react';

import styles from './encrypt.module.scss';

import { ContentBox } from 'components/ContentBox';
import { Alarm } from 'components/Alarm';
import { Tag } from 'components/Tag';

const encryptLinks = [
  { title: 'Простое шифрование', href: '/encrypt/basic/', isActive: true },
  { title: 'Блочное шифрование', href: '/encrypt/block/', isActive: true },
];

export default function() {
  return (
    <ContentBox title="Шифрование">
      <Alarm type="news" text="Новинка: блочные шифры &#128522;!" />
      <br />
      <span>Доступные методы шифрования:</span>
      <ul>
        {encryptLinks.map((link, index) => (
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

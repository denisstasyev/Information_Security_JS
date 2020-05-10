import * as React from 'react';

import styles from './decrypt.module.scss';

import { ContentBox } from 'components/ContentBox';
import { Alarm } from 'components/Alarm';
import { Tag } from 'components/Tag';

const encryptLinks = [
  { title: 'Простое расшифрование', href: '/decrypt/basic/', isActive: true },
  { title: 'Блочное расшифрование', href: '/decrypt/block/', isActive: true },
  { title: 'Ассинхронное расшифрование', href: '/decrypt/asymmetric/', isActive: true },
];

export default function() {
  return (
    <ContentBox title="Расшифрование">
      <Alarm type="news" text="Новинка: блочные шифры &#128522;!" />
      <br />
      <span>Доступные методы расшифрования:</span>
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

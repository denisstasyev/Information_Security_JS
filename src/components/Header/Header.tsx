import * as React from 'react';
import { Link } from 'react-router-dom';

import styles from './header.module.scss';

import { Tag } from 'components/Tag';

const links = [
  { title: 'Зашифровать', href: '/encrypt', isActive: true },
  { title: 'Расшифровать', href: '/decrypt', isActive: true },
  { title: 'Проверить целостность', href: '/checksum', isActive: true },
  { title: 'Хешировать', href: '/hash', isActive: false },
];

export default function() {
  return (
    <div className={styles['header']}>
      <h1 className={styles['header-title']}>
        <Link to="/">Спецпроект "Шифровальщик"</Link>
      </h1>
      <div className={styles['header-links']}>
        {links.map((link, index) => (
          <div className={styles['link']} key={index}>
            <Tag link={link} />
          </div>
        ))}
      </div>
    </div>
  );
}

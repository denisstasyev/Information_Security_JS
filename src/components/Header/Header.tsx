import * as React from 'react';
import { Link } from 'react-router-dom';

import styles from './header.module.scss';

import { Tag } from 'components/Tag';

import { homepage } from 'config';

const links = [
  { title: 'Зашифровать', href: '/encrypt', isActive: true },
  { title: 'Расшифровать', href: '/decrypt', isActive: true },
  { title: 'Хешировать', href: '/', isActive: false },
];

export default function() {
  return (
    <div className={styles['header']}>
      <h1 className={styles['header-title']}>
        <Link to={homepage}>Спецпроект "Шифровальщик"</Link>
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

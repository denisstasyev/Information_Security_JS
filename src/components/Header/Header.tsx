import * as React from 'react';
import { Link } from 'react-router-dom';

import styles from './header.module.scss';

import { Tag } from 'components/Tag';

import Logo from 'assets/logo.png';

import { mainLinks } from 'config';

export default function() {
  return (
    <div id="header" className={styles['header']}>
      <Link className={styles['header-title']} to="/">
        <img className={styles['logo']} alt="Information_Security_JS logo" src={Logo} />
        <h1 className={styles['text']}>Спецпроект "Шифровальщик"</h1>
      </Link>

      <div className={styles['header-links']}>
        {mainLinks.map((link, index) => (
          <div className={styles['link']} key={index}>
            <Tag link={link} />
          </div>
        ))}
      </div>
    </div>
  );
}

import * as React from 'react';
import { Link } from 'react-router-dom';

import styles from './footer.module.scss';

import { Tag } from 'components/Tag';

import { links } from 'config';

export default function() {
  return (
    <div id="footer" className={styles['footer']}>
      <div className={styles['footer-links']}>
        {links.map((link, index) => (
          <div className={styles['link']} key={index}>
            <Tag link={link} />
          </div>
        ))}
      </div>
      <Link className={styles['copyright']} to="/">
        © Спецпроект "Шифровальщик", {new Date().getFullYear()} г. Все права защищены.
      </Link>
    </div>
  );
}

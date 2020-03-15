import * as React from 'react';
import { Link } from 'react-router-dom';

import styles from './footer.module.scss';

import { Tag } from 'components/Tag';

import { allLinks } from 'config';

export default function() {
  return (
    <div id="footer" className={styles['footer']}>
      <div className={styles['footer-links']}>
        {allLinks.map((link, index) => (
          <div className={styles['link']} key={index}>
            <Tag link={link} />
          </div>
        ))}
      </div>
      <Link className={styles['copyright']} to="/">
        © Спецпроект "Шифровальщик", {new Date().getFullYear()} г. Все права защищены.
      </Link>
      {/* <!-- Rating Mail.ru logo --> */}
      {/* <a href="https://top.mail.ru/jump?from=3165691">
        <img
          src="https://top-fwz1.mail.ru/counter?id=3165691;t=466;l=1"
          style={{ border: 0 }}
          height="31"
          width="88"
          alt="Top.Mail.Ru"
        />
      </a> */}
      {/* <!-- //Rating Mail.ru logo --> */}
    </div>
  );
}

import * as React from 'react';
import { Link } from 'react-router-dom';

import styles from './tag.module.scss';

import { homepage } from 'config';

interface TagProps {
  link: { title: string; href: string; isActive: boolean };
}

export default function(props: TagProps) {
  return (
    <div className={styles[props.link.isActive ? 'header-link-active' : 'header-link-inactive']}>
      {props.link.isActive ? (
        <Link to={homepage + props.link.href}>{props.link.title}</Link>
      ) : (
        props.link.title
      )}
    </div>
  );
}

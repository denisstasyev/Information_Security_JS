import * as React from 'react';

import styles from './notfound.module.scss';

import { ContentBox } from 'components/ContentBox';
import { Tag } from 'components/Tag';

export default function() {
  return (
    <ContentBox title="ERROR 404: Page Not Found &#128549;!">
      <div className={styles['text']}>
        К сожалению, запрашиваемая страница не существует, но мы уже активно работаем над её
        созданием &#128522;!
      </div>
      <br />
      <div className={styles['text']}>
        Больше информации о нас вы можете найти на
        <div className={styles['tag']}>
          <Tag link={{ title: 'главной странице', href: '/', isActive: true }} />
        </div>
        .
      </div>
    </ContentBox>
  );
}

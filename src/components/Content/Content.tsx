import * as React from 'react';

import styles from './content.module.scss';

export default function(props: any) {
  const setContentPosition = () => {
    const ids = ['content', 'footer'];
    ids.forEach(
      id =>
        (document.getElementById(id)!.style.top = `${document.getElementById('header')!
          .offsetHeight + 10}px`),
    );
    document.getElementById('content')!.style.minHeight = `${window.innerHeight -
      document.getElementById('header')!.offsetHeight}px`;
  };

  React.useEffect(() => {
    setContentPosition();

    // window.addEventListener('resize', setContentPosition);
  }, []);

  return (
    <div id="content" className={styles['content']}>
      {props.children}
    </div>
  );
}

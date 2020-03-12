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
      document.getElementById('header')!.offsetHeight -
      50}px`;
  };

  React.useEffect(() => {
    setContentPosition();

    window.addEventListener('change-orientation', setContentPosition);

    let isLandscape = window.innerHeight < window.innerWidth;

    // Due to iOS viewport height change (because of Safari's interface)
    // we need custom event to detect orientation change
    window.addEventListener('resize', () => {
      const currentIsLandscape = window.innerHeight < window.innerWidth;
      if (currentIsLandscape !== isLandscape) {
        isLandscape = window.innerHeight < window.innerWidth;
        window.dispatchEvent(new CustomEvent('change-orientation'));
      }
    });
  }, []);

  return (
    <div id="content" className={styles['content']}>
      {props.children}
    </div>
  );
}

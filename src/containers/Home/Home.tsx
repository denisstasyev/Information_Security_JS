import * as React from 'react';

import styles from './home.module.scss';

import { Header } from 'components/Header';
import { Tag } from 'components/Tag';

export default function() {
	return (
		<>
			<Header />
			<h2>Добро пожаловать на наш сайт!</h2>
			<div className={styles['text']}>
				Сейчас вы можете
				<div className={styles['tag']}>
					<Tag link={{ title: 'зашифровать', href: '/encrypt', isActive: true }} />
				</div>
				и
				<div className={styles['tag']}>
					<Tag link={{ title: 'расшифровать', href: '/decrypt', isActive: true }} />
				</div>
				сообщение
			</div>
		</>
	);
}

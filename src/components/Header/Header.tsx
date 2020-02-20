import * as React from 'react';
import { Link } from 'react-router-dom';

import styles from './header.module.scss';

import { homepage } from 'config';

const links = [
	{ title: 'Зашифровать', href: '/send', isActive: true },
	{ title: 'Расшифровать', href: '/receive', isActive: true },
	{ title: 'Хешировать', href: '/', isActive: false },
];

export default function() {
	return (
		<div className={styles['header']}>
			<h1 className={styles['header-title']}>Спецпроект "Шифровальщик"</h1>
			<div className={styles['header-links']}>
				{links.map((link, index) => (
					<div
						key={index}
						className={
							styles[link.isActive ? 'header-link-active' : 'header-link-inactive']
						}
					>
						{link.isActive ? (
							<Link to={homepage + link.href}>{link.title}</Link>
						) : (
							link.title
						)}
					</div>
				))}
			</div>
		</div>
	);
}

import * as React from 'react';
import { Link } from 'react-router-dom';

import { Header } from 'components/Header';
import { homepage } from 'config';

export default function() {
	return (
		<>
			<Header />
			<div>
				<h2>Receive</h2>
				<div>Soooooooon</div>
				<Link to={homepage + '/send'}>Go to Send</Link>
			</div>
		</>
	);
}

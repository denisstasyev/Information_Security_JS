import * as React from 'react';
import { Link } from 'react-router-dom';

import { homepage } from 'config';

export default function() {
	return (
		<div>
			<h1>Information_Security_JS</h1>
			<Link to={homepage + '/send'}>Send</Link>
			<Link to={homepage + '/receive'}>Receive</Link>
		</div>
	);
}

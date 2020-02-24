import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Home } from 'containers/Home';
import { Encrypt } from 'containers/Encrypt';
import { Decrypt } from 'containers/Decrypt';

import { homepage } from 'config';

const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path={homepage} component={Home} />
				<Route path={homepage + '/encrypt'} component={Encrypt} />
				<Route path={homepage + '/decrypt'} component={Decrypt} />
			</Switch>
		</BrowserRouter>
	);
};

export default App;

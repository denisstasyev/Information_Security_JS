import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Home } from 'containers/Home';
import { Encrypt } from 'containers/Encrypt';
// import { Receive } from 'containers/Receive';

import { homepage } from 'config';

const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path={homepage} component={Home} />
				<Route path={homepage + '/encrypt'} component={Encrypt} />
				{/* <Route path={homepage + '/receive'} component={Receive} /> */}
			</Switch>
		</BrowserRouter>
	);
};

export default App;

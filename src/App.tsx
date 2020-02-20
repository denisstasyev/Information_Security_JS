import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { Send } from 'containers/Send';
import { Receive } from 'containers/Receive';

import { homepage } from 'config';

const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path={homepage}>
					<Redirect to={homepage + '/send'} />
				</Route>
				<Route path={homepage + '/send'} component={Send} />
				<Route path={homepage + '/receive'} component={Receive} />
			</Switch>
		</BrowserRouter>
	);
};

export default App;

import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/Information_Security_JS">
					<Redirect to="/Information_Security_JS/send" />
				</Route>
				{/* <Route path="/Information_Security_JS/send" component={Send} /> */}
				{/* <Route path="/Information_Security_JS/receive" component={Receive} /> */}
			</Switch>
		</BrowserRouter>
	);
}

export default App;

import React from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import Login from '../view/login/Login'
import NewSandBox from '../view/sandbox/NewSandBox'

function IndexRouter(props) {
	return (
		<HashRouter>
			<Switch>
				<Route path="/login" component={Login}></Route>
				{/* <Route path="/" component={NewSandBox}></Route> */}
				<Route path="/" render={() =>
					localStorage.getItem('token') ? <NewSandBox /> : <Redirect to="/login" />} />
			</Switch>
		</HashRouter>
	);
}

export default IndexRouter;
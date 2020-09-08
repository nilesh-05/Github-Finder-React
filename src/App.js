import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Users from './Components/users/Users'
import Navbar from './Components/layouts/Navbar'
import Search from './Components/users/Search'
import Alert from './Components/layouts/Alert'
import about from './Components/pages/about'
import User from "./Components/users/User";
import GithubState from './context/github/GithubState'
import AlertState from './context/alert/AlertState'

const App = () => {

	return (
		<GithubState>
			<AlertState>
				<Router>
					<div className="App">
						<Navbar />
						<div className="container">
							<Alert />
							<Switch>
								<Route exact path='/' render={props => (
									<Fragment>
										<Search />
										<Users />
									</Fragment>
								)}>
								</Route>
								<Route exact path='/about' component={about} />
								<Route exact path='/user/:login' component={User} />
							</Switch>
						</div>
					</div>
				</Router>
			</AlertState>
		</GithubState>
	);
}

export default App; 
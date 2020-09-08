import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './Components/layouts/Navbar'
import Alert from './Components/layouts/Alert'
import about from './Components/pages/about'
import User from "./Components/users/User";
import GithubState from './context/github/GithubState'
import AlertState from './context/alert/AlertState'
import NotFound from './Components/pages/NotFound'
import Home from './Components/pages/home'


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
								<Route
									exact
									path='/'
									component={Home}>
								</Route>
								<Route
									exact
									path='/about'
									component={about} />
								<Route exact path='/user/:login' component={User} />
								<Route component={NotFound} />
							</Switch>
						</div>
					</div>
				</Router>
			</AlertState>
		</GithubState>
	);
}

export default App; 
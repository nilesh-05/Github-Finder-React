import React, { useState, Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Users from './Components/users/Users'
import Navbar from './Components/layouts/Navbar'
import Search from './Components/users/Search'
import axios from 'axios'
import Alert from './Components/layouts/Alert'
import about from './Components/pages/about'
import User from "./Components/users/User";
import GithubState from './context/github/GithubState'

const App = () => {
	const [users, setUsers] = useState([])
	const [user, setUser] = useState({})
	const [repos, setRepos] = useState([])
	const [loading, setLoading] = useState(false)
	const [alert, setAlert] = useState(null)




	const clearUsers = () => {
		setUsers([])
		setLoading(false)
	}


	const showAlert = (msg, type) => {
		setAlert({ msg, type })
		setTimeout(() => {
			setAlert(null)
		}, 4000)
	}

	//get a single github user
	const getUser = async (username) => {
		setLoading(true)
		const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
		setUser(res.data)
		setLoading(false)
	}

	//get repos
	const getUserRepos = async (username) => {
		setLoading(true)
		const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
		setRepos(res.data)
		setLoading(false)
	}


	return (
		<GithubState>
			<Router>
				<div className="App">
					<Navbar />
					<div className="container">
						<Alert alert={alert} />
						<Switch>
							<Route exact path='/' render={props => (
								<Fragment>
									<Search
										clearUsers={clearUsers}
										showClear={users.length > 0 ? true : false}
										setAlert={showAlert}
									/>
									<Users />
								</Fragment>
							)}>
							</Route>
							<Route exact path='/about' component={about} />
							<Route exact path='/user/:login' render={props => (
								<User {...props} getUser={getUser} user={user} loading={loading} getUserRepos={getUserRepos} repos={repos} />
							)} />
						</Switch>
					</div>
				</div>
			</Router>
		</GithubState>
	);
}

export default App; 
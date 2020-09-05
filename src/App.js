import React, { Component, Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Users from './Components/users/Users'
import Navbar from './Components/layouts/Navbar'
import Search from './Components/users/Search'
import axios from 'axios'
import Alert from './Components/layouts/Alert'
import about from './Components/pages/about'
import User from "./Components/users/User";

class App extends Component {
	state = {
		users: [],
		loading: false,
		alert: null,
		user: {},
		repos: []
	}


	async componentDidMount() {
		this.setState({ loading: true })
		const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
		this.setState({ users: res.data, loading: false })
	}


	searchUsers = async (text) => {
		this.setState({ loading: true })
		const res = await axios.get(`https://api.github.com/search/users?q=${text}&?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
		this.setState({ users: res.data.items, loading: false })
	}


	clearUsers = () => {
		this.setState({ users: [], loading: false })
	}


	setAlert = (msg, type) => {
		this.setState({ alert: { msg: msg, type: type } })
		setTimeout(() => {
			this.setState({ alert: null })
		}, 4000)
	}

	//get a single github user
	getUser = async (username) => {
		this.setState({ loading: true })
		const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
		this.setState({ user: res.data, loading: false })
	}

	//get repos
	getUserRepos = async (username) => {
		this.setState({ loading: true })
		const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
		this.setState({ repos: res.data, loading: false })
	}


	render() {
		const { users, loading, user, repos } = this.state
		return (
			<Router>
				<div className="App">
					<Navbar />
					<div className="container">
						<Alert alert={this.state.alert} />
						<Switch>
							<Route exact path='/' render={props => (
								<Fragment>
									<Search
										searchUsers={this.searchUsers}
										clearUsers={this.clearUsers}
										showClear={users.length > 0 ? true : false}
										setAlert={this.setAlert}
									/>
									<Users loading={loading} users={users} />
								</Fragment>
							)}></Route>
							<Route exact path='/about' component={about} />
							<Route exact path='/user/:login' render={props => (
								<User {...props} getUser={this.getUser} user={user} loading={loading} getUserRepos={this.getUserRepos} repos={repos} />
							)} />
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}
export default App; 
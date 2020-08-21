import React, { Component } from 'react';
import './App.css';
import UserItem from './Components/users/UserItem'
import Navbar from './Components/layouts/Navbar'
class App extends Component {
	render() {
		return (
			<div className="App">
				<Navbar />
				<UserItem />
			</div>
		);
	}
}

export default App;

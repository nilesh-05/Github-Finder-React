import React, { Component } from 'react';
import './App.css';
import Users from './Components/users/Users'
import Navbar from './Components/layouts/Navbar'

class App extends Component {
	render() {
		return (
			<div className="App">
				<Navbar />
				<div className="container">
					<Users />
				</div>
			</div>
		);
	}
}

export default App; 
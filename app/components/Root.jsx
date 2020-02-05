import React, { Component } from 'react';
import axios from 'axios';

import './Root.css';

import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from 'react-router-dom';

import Home from './Home';


export default class Root extends Component {

	constructor(props) {
		super(props);

		this.state = {
			employees: []
		}
	}

	componentDidMount() {
		axios.get('/api/employees')
			.then(res => {
				console.log('employees received: ', res.data)
				this.setState({
					employees: res.data
				})
			}).catch(err => { //Missing .catch
				console.log(err);
			})
	}


	render() {


		return (
			<div>
				<Router>
					<div>
						<Switch>
							<Route
								exact
								path="/"
								render={(props) => <Home employees={this.state.employees} {...props}/>}
							/>
						</Switch>
					</div>
				</Router>
			</div>
		)
	}
}
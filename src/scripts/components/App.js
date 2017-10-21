import React, { Compoment } from 'react';
import axios from 'axios';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			ninjas: [],
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(e) {
		e.preventDefault();
		const lng = this.refs.lng.value;
		const lat = this.refs.lat.value;
		fetch(`http://localhost:4000/api/ninjas?lng=${lng}&lat=${lat}`)
			.then(data => data.json())
			.then(json => {
				this.setState({
					ninjas: json,
				});
				console.log(json);
			});
	}
	render() {
		let ninjas = this.state.ninjas;
		console.log(ninjas);
		ninjas = ninjas.map((ninja, index) => (
			<li key={index}>
				<span className={ninja.available} />
				<span className="name">{ninja.name}</span>
				<span className="rank">{ninja.rank}</span>
				<span className="dist">{Math.floor(ninja.dis / 1000)} km</span>
			</li>
		));
		return (
			<div id="ninja-container">
				<form id="search" onSubmit={this.handleSubmit}>
					<label>Enter your Latitude:</label>
					<input type="text" ref="lat" placeholder="latitude" required />
					<label>Enter your Longitude:</label>
					<input type="text" ref="lng" placeholder="longitude" required />
					<input type="submit" value="Find Ninjas" />
				</form>
				<ul>{ninjas}</ul>
			</div>
		);
	}
}

export default App;

import React from 'react';
import { Link } from 'react-router-dom';

import './style/index.scss';

export default function App() {
	return (
		<div className="App">
			<h1>Have a nice days!</h1>
			<Link to="/todo">Todo</Link>
		</div>
	);
}

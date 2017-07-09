import React from 'react';
import 'style/index.scss';
import { Link } from 'react-router-dom';

export default function App() {
    return (
        <div className="App">
            <h1>Have a nice day!</h1>
            <Link to="/todo">Todo</Link>
        </div>
    );
}

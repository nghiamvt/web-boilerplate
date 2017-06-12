import React from 'react';
import { connect } from 'react-redux';
import './style/index.css';

function App({ dispatch }) {
    // dispatch({
    //     type: 'TEST_API',
    // });

    console.log('process.env :', process.env);
    return (
        <div className="App">
            <h1>Have a nice day!</h1>
        </div>
    );
}

export default connect()(App);

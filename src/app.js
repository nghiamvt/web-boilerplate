import React from 'react';
import './style/index.css';
import { get } from './utils/immutable';

export default function App() {
    const obj = { foo: [{ bar: 'gold-unicorn' }, 'white-unicorn', 'silver-unicorn'] };
    const newObj = get(obj, 'fo1o.2');
    console.log(newObj);

    return (
        <div className="App">
            <h1>Have a nice day!</h1>
        </div>
    );
}

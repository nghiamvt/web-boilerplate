// @flow
import React from 'react';

import Header from './components/header';
import TodoList from './components/todo-list';
import Footer from './components/footer';

import './todos.styl';

const Todo = () => (
    <div className="todoapp">
        <Header />
        <TodoList />
        <Footer />
    </div>
);

export default Todo;

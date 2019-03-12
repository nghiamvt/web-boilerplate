import React from 'react';
import Footer from './components/footer';
import Header from './components/header';
import TodoList from './components/todo-list';
import './todo.scss';

const Todo = () => (
  <div className="todoapp">
    <Header />
    <TodoList />
    <Footer />
  </div>
);

export default Todo;

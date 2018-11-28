import React from 'react';

import Header from './components/header';
import TodoList from './components/todo-list';
import Footer from './components/footer';

const Todo = () => (
  <div className="TodoPage">
    <div className="todoapp">
      <Header />
      <TodoList />
      <Footer />
    </div>
  </div>
);

export default Todo;

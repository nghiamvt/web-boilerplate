// @flow
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TodoTextInput from './todo-text-input';
import { addTodo } from '../actions';

export type Props = {
	addTodo: Function,
}

function Header(props: Props) {
  return (
    <header className="header">
      <h1>Todos</h1>
      <TodoTextInput
        newTodo
        onSave={props.addTodo}
        placeholder="What needs to be done?"
      />
    </header>
  );
}

export default connect(
  null,
  (dispatch) => bindActionCreators({ addTodo }, dispatch),
)(Header);

// @flow
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTodo } from '../actions';
import TodoTextInput from './todo-text-input';

export type Props = {
  addTodo: Function,
};

function Header(props: Props) {
  return (
    <div className="header">
      <h1>Todos</h1>
      <TodoTextInput
        newTodo
        onSave={props.addTodo}
        placeholder="What needs to be done?"
      />
    </div>
  );
}

export default connect(
  null,
  dispatch => bindActionCreators({ addTodo }, dispatch),
)(Header);

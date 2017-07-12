// @flow
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editTodo, deleteTodo, toggleTodo, toggleAll } from '../actions';
import { todoSelector, filteredTodoSelector, activeCountSelector } from '../selectors';

import TodoItem from './todo-item';
import type { Todos } from '../types';

export type Props = {
	todoList: Todos,
	filteredTodoList: Todos,
	activeCount: number,
	editTodo: Function,
	deleteTodo: Function,
	toggleTodo: Function,
	toggleAll: Function
};

const onToggleAll = (props: Props) => {
	const todoKeys = Object.keys(props.todoList);
	const notAllMarked = todoKeys.some(k => !props.todoList[k].completed);
	const newTodos = todoKeys.reduce((result, key) => {
		return {
			...result,
			[key]: {
				...props.todoList[key],
				completed: notAllMarked,
			},
		};
	}, {});
	props.toggleAll(newTodos);
};

const renderToggleAll = (props: Props) => {
	const numOfTodo = Object.keys(props.filteredTodoList).length;
	if (!numOfTodo) return null;
	return (
		<input
			className="toggle-all"
			type="checkbox"
			checked={!props.activeCount}
			onChange={() => onToggleAll(props)}
		/>
	);
};

const renderTodoItem = (todo, prop: Props) => {
	return (
		<TodoItem
			key={todo.id}
			todo={todo}
			onEditTodo={prop.editTodo}
			onDeleteTodo={prop.deleteTodo}
			onToggleTodo={prop.toggleTodo}
		/>
	);
};

const TodoList = (props: Props) => {
	return (
		<div className="main">
			{renderToggleAll(props)}
			<ul className="todo-list">
				{Object.keys(props.filteredTodoList).map((k) => renderTodoItem(props.filteredTodoList[k], props))}
			</ul>
		</div>
	);
};

export default connect(
	(state) => {
		return {
			todoList: todoSelector(state),
			filteredTodoList: filteredTodoSelector(state),
			activeCount: activeCountSelector(state),
		};
	},
	(dispatch) => {
		return bindActionCreators({
			editTodo,
			deleteTodo,
			toggleTodo,
			toggleAll,
		}, dispatch);
	},
)(TodoList);

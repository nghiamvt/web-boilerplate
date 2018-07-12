// @flow
import { SET_DATA, REMOVE_DATA } from '../../store/data-action';
import type { Todo } from './types';

const path = 'todo.todos';

export const addTodo = (text: string) => {
	const id = Math.floor(Date.now());
	return SET_DATA({
		_path: `${path}.${id}`,
		_value: {
			id,
			text,
			completed: false,
		},
		type: 'ADD_TODO',
	});
};

export const deleteTodo = (ids: Array<string>) => {
	return REMOVE_DATA({
		_path: path,
		_value: ids,
	});
};

export const toggleTodo = (todo: Todo) => {
	return SET_DATA({
		_path: `${path}.${todo.id}.completed`,
		_value: !todo.completed,
	});
};

export const clearCompleted = (todoList: Todo) => {
	return SET_DATA({
		_path: path,
		_value: todoList,
	});
};

export const changeFilter = (filter: string) => {
	return SET_DATA({
		_path: 'todo.visibilityFilter',
		_value: filter,
	});
};

export const toggleAll = (todoList: string) => {
	return SET_DATA({
		_path: path,
		_value: todoList,
	});
};

export const editTodo = (id: number, text: string) => {
	return SET_DATA({
		_path: `${path}.${id}.text`,
		_value: text,
	});
};

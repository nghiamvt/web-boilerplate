import { SET_DATA, REMOVE_DATA, MERGE_DATA } from '@/store/data-action';
import type { Todo } from './types';

const path = 'todo';

export const addTodo = (text: string) => {
  const id = Math.floor(Date.now());
  return MERGE_DATA({
    _path: path,
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
    type: `TOGGLE_${todo.id}`,
  });
};

export const clearCompleted = (todoList: Todo) => {
  return SET_DATA({
    _path: path,
    _value: todoList,
    type: 'CLEAR_COMPLETED',
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

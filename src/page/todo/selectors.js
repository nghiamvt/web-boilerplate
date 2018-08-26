import { createSelector } from 'reselect';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from './constants';

export const todoSelector = (state) => state.todo.todos;
export const selectedFilterSelector = (state) => state.todo.visibilityFilter;

export const activeCountSelector = createSelector(
	todoSelector,
	(todoList) => Object.keys(todoList).filter((k) => !todoList[k].completed).length,
);

export const activeTodoListSelector = createSelector(
	todoSelector,
	(todoList) => Object.keys(todoList).reduce((result, key) => {
  return todoList[key].completed ? result : { ...result, [key]: todoList[key] };
}, {}),
);

export const completedTodoListSelector = createSelector(
	todoSelector,
	(todoList) => Object.keys(todoList).reduce((result, key) => {
  return !todoList[key].completed ? result : { ...result, [key]: todoList[key] };
}, {}),
);

export const filteredTodoSelector = createSelector(
	selectedFilterSelector, activeTodoListSelector, completedTodoListSelector, todoSelector,
	(selectedFilter, activeTodoList, completedTodoList, todoList) => {
  switch (selectedFilter) {
    case SHOW_COMPLETED:
      return completedTodoList;
    case SHOW_ACTIVE:
      return activeTodoList;
    case SHOW_ALL:
    default:
      return todoList;
  }
},
);

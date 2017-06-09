import * as types from './constants';
import { SET_DATA, REMOVE_DATA, TOGGLE_DATA } from '../../store/dataAction';

export const addTodo = (text) => {
    const id = Math.floor(Date.now());
    return SET_DATA({
        path: `todo.${id}`,
        id,
        text,
        completed: false,
    });
};

export const deleteTodo = (id) => {
    return REMOVE_DATA({
        path: `todo.${id}`,
    });
};

export const editTodo = (id, text) => {
    return SET_DATA({
        path: `todo.${id}`,
        text,
    });
};

export const completeTodo = (id) => {
    return TOGGLE_DATA({
        path: `todo.${id}.completed`,
    });
};

// TODO: handle next 2 actions
export const completeAll = () => ({ type: types.COMPLETE_ALL });
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED });

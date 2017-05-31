import * as types from './constants';

export const addTodo = (text) => {
    const id = Math.floor(Date.now());
    return {
        type: 'OBJECT_ADD',
        path: `/todos/${id}`,
        data: [{ id, text, completed: false }],
    };
};
export const deleteTodo = id => ({ type: types.DELETE_TODO, id });
export const editTodo = (id, text) => ({ type: types.EDIT_TODO, id, text });
export const completeTodo = id => ({ type: types.COMPLETE_TODO, id });
export const completeAll = () => ({ type: types.COMPLETE_ALL });
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED });

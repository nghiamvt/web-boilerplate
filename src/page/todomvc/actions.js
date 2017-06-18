import { SET_DATA, REMOVE_DATA, MERGE_DATA } from 'store/data-action';

export const addTodo = (text) => {
    const id = Math.floor(Date.now());
    return SET_DATA({
        _path: `todomvc.${id}`,
        id,
        text,
        completed: false,
    });
};

export const deleteTodo = (ids) => {
    return REMOVE_DATA({
        _path: 'todomvc',
        _ids: ids,
    });
};

export const editTodo = (id, text) => {
    return SET_DATA({
        _path: `todomvc.${id}`,
        id,
        text,
    });
};

export const completeTodo = (id) => {
    return SET_DATA({
        _path: `todomvc.${id}.completed`,
    });
};

export const completeAll = (newTodos) => {
    return MERGE_DATA({
        _path: `todomvc`,
        ...newTodos,
    });
};


export function clearCompleted(ids) {
    return REMOVE_DATA({
        _path: 'todomvc',
        _ids: ids,
    });
}

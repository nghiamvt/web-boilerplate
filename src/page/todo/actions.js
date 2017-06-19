import { SET_DATA, REMOVE_DATA, TOGGLE_DATA } from 'store/dataAction';

export const addTodo = (text) => {
    const id = Math.floor(Date.now());
    return SET_DATA({
        _path: `todo.${id}`,
        id,
        text,
        completed: false,
    });
};

export const deleteTodo = (id) => {
    return REMOVE_DATA({
        _path: 'todo',
        _ids: [id],
    });
};

export const editTodo = (id, text) => {
    return SET_DATA({
        _path: `todo.${id}`,
        text,
    });
};

export const completeTodo = (id) => {
    return TOGGLE_DATA({
        _path: `todo.${id}.completed`,
    });
};

export const completeAll = () => {
    return TOGGLE_DATA({
        _path: 'todo.*.completed',
    });
}


export function clearCompleted(ids) {
    return REMOVE_DATA({
        _path: 'todo',
        _ids: ids
    });
}

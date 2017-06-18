import React from 'react';
import PropTypes from 'prop-types';
import TodoTextInput from './TodoTextInput';

function Header({ addTodo }) {
    const handleSave = text => {
        if (text.length !== 0) {
            addTodo(text);
        }
    };

    return (
        <header className="header">
            <h1>Todos</h1>
            <TodoTextInput
                newTodo
                onSave={handleSave}
                placeholder="What needs to be done?"
            />
        </header>
    );
}

Header.propTypes = {
    addTodo: PropTypes.func.isRequired,
};

export default Header;

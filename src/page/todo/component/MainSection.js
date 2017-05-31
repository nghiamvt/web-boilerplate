import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import Footer from './Footer';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants';

const TODO_FILTERS = {
    [SHOW_ALL]: () => true,
    [SHOW_ACTIVE]: todo => !todo.completed,
    [SHOW_COMPLETED]: todo => todo.completed,
};

export default class MainSection extends Component {
    static propTypes = {
        todos: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = { filter: SHOW_ALL };
    }

    handleShow = filter => {
        this.setState({ filter });
    }

    renderToggleAll = (props, completedCount) => {
        const numOfTodo = Object.keys(props.todos).length;
        if (!numOfTodo) return null;
        return (
            <input
                className="toggle-all"
                type="checkbox"
                checked={completedCount === numOfTodo}
                onChange={props.actions.completeAll}
            />
        );
    }

    renderTodoList = (props, state) => {
        const filteredTodos = Object.keys(props.todos).reduce((result, key) => {
            return TODO_FILTERS[state.filter](props.todos[key]) ? { ...result, [key]: props.todos[key] } : {};
        }, {});
        return (
            <ul className="todo-list">
                {Object.keys(filteredTodos).map((key) => {
                    const todo = filteredTodos[key];
                    return <TodoItem key={todo.id} todo={todo} {...props.actions} />;
                })}
            </ul>
        );
    }

    renderFooter(props, state, completedCount) {
        const numOfTodo = Object.keys(props.todos).length;
        if (!numOfTodo) return null;
        const activeCount = numOfTodo - completedCount;

        return (
            <Footer
                completedCount={completedCount}
                activeCount={activeCount}
                filter={state.filter}
                onClearCompleted={props.actions.clearCompleted}
                onShow={this.handleShow}
            />
        );
    }

    renderComponent(props, state) {
        const completedCount = Object.keys(props.todos).reduce((count, key) => {
            return props.todos[key].completed ? count + 1 : count;
        }, 0);
        return (
            <div className="main">
                {this.renderToggleAll(props, completedCount)}
                {this.renderTodoList(props, state)}
                {this.renderFooter(props, state, completedCount)}
            </div>
        );
    }

    render() {
        return this.renderComponent(this.props, this.state);
    }
}

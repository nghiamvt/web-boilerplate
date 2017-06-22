// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import TodoTextInput from './todo-text-input';
import type { Todo } from '../types';

export type Props = {
    todo: Todo,
    onEditTodo: Function,
    onDeleteTodo: Function,
    onToggleTodo: Function,
};

type State = {
    editing: boolean,
}

export default class TodoItem extends Component {
    props: Props;
    state: State;
    constructor(props: Props) {
        super(props);
        this.state = {
            editing: false,
        };
    }

    handleDoubleClick = () => {
        this.setState({ editing: true });
    }

    handleSave = (id: number, text: string) => {
        if (text.length === 0) {
            this.props.onDeleteTodo([id]);
        } else {
            this.props.onEditTodo(id, text);
        }
        this.setState({ editing: false });
    }

    renderTodoEditing = (props: Props, state: State) => {
        return (
            <TodoTextInput
                text={props.todo.text}
                editing={state.editing}
                onSave={(text) => this.handleSave(props.todo.id, text)}
            />
        );
    }

    renderTodoView = (props: Props) => {
        return (
            <div className="view">
                <input
                    id={props.todo.id}
                    className="toggle"
                    type="checkbox"
                    checked={props.todo.completed}
                    onChange={() => props.onToggleTodo(props.todo)}
                />
                <label htmlFor={props.todo.id} onDoubleClick={this.handleDoubleClick}>{props.todo.text}</label>
                <button className="destroy" onClick={() => props.onDeleteTodo([props.todo.id])} />
            </div>
        );
    }

    renderComponent = (props: Props, state: State) => {
        const cls = classNames({
            completed: props.todo.completed,
            editing: state.editing,
        });
        return (
            <li className={cls}>
                {state.editing ? this.renderTodoEditing(props, state) : this.renderTodoView(props)}
            </li>
        );
    }

    render() {
        return this.renderComponent(this.props, this.state);
    }
}

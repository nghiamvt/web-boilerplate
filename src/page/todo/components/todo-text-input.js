import React, { Component } from 'react';
import classNames from 'classnames';

export type Props = {
    onSave?: Function,
    text?: string,
    placeholder?: string,
    editing?: boolean,
    newTodo?: boolean,
}
type State = {};
export default class TodoTextInput extends Component<void, Props, State> {
    props: Props;
    state: State;

    static defaultProps = {
        onSave: () => {},
        text: '',
        placeholder: '',
        editing: false,
        newTodo: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            text: props.text || '',
        };
    }

    handleSubmit = e => {
        const text = e.target.value.trim();
        if (e.which === 13) {
            this.props.onSave(text);
            if (this.props.newTodo) {
                this.setState({ text: '' });
            }
        }
    }

    handleChange = e => {
        this.setState({ text: e.target.value });
    }

    handleBlur = e => {
        if (!this.props.newTodo) {
            this.props.onSave(e.target.value);
        }
    }

    render() {
        const cls = classNames({
            edit: this.props.editing,
            'new-todo': this.props.newTodo,
        });
        return (
            <input className={cls}
                type="text"
                placeholder={this.props.placeholder}
                value={this.state.text}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                onKeyDown={this.handleSubmit}
            />
        );
    }
}

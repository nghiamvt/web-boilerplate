import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class TodoTextInput extends Component {
    static propTypes = {
        onSave: PropTypes.func.isRequired,
        text: PropTypes.string,
        placeholder: PropTypes.string,
        editing: PropTypes.bool,
        newTodo: PropTypes.bool,
    }

    static defaultProps = {
        text: '',
        placeholder: '',
        editing: false,
        newTodo: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text || '',
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
        const cls = classnames({
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

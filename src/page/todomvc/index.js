import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from './component/Header';
import MainSection from './component/MainSection';
import * as TodoActions from './actions';

import { todoList } from './selectors';
import './todomvc.css';

const mapStateToProps = (state) => ({
    todos: todoList(state),
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch),
});

function TodoMVC(props) {
    return (
        <div className="todoapp">
            <Header addTodo={props.actions.addTodo} />
            <MainSection todos={props.todos} actions={props.actions} />
        </div>
    );
}

TodoMVC.propTypes = {
    todos: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TodoMVC);

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from './component/Header';
import MainSection from './component/MainSection';
import * as TodoActions from './actions';

import { getTodos } from './selectors';
import './todomvc.css';

const mapStateToProps = (state) => ({
    todos: getTodos(state),
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch),
})

function TodoMVC({ todos, actions }) {
    return (
        <div className="todoapp">
            <Header addTodo={actions.addTodo} />
            <MainSection todos={todos} actions={actions} />
        </div>
    );
}

TodoMVC.propTypes = {
    todos: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TodoMVC);

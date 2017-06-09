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
    todo: todoList(state),
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch),
});

function TodoMVC({ todo, actions }) {
    return (
        <div className="todoapp">
            <Header addTodo={actions.addTodo} />
            <MainSection todos={todo} actions={actions} />
        </div>
    );
}

TodoMVC.propTypes = {
    todo: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TodoMVC);

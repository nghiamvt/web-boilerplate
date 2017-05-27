import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {};
}

const TodoMVC = ({ todos, actions }) => (
    <div className="todomvc">
        <span>hello todoMVC</span>
    </div>
)

TodoMVC.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.number).isRequired,
    dispatch: PropTypes.func.isRequired,
}

export default connect(
    mapStateToProps,
    dispatch => ({ dispatch }),
)(TodoMVC);

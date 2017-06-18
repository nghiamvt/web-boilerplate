import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants';

const FILTER_TITLES = {
    [SHOW_ALL]: 'All',
    [SHOW_ACTIVE]: 'Active',
    [SHOW_COMPLETED]: 'Completed',
}

export default class Footer extends Component {
    static propTypes = {
        completedCount: PropTypes.number.isRequired,
        activeCount: PropTypes.number.isRequired,
        filter: PropTypes.string.isRequired,
        onClearCompleted: PropTypes.func.isRequired,
        onShow: PropTypes.func.isRequired,
    }

    renderTodoCount() {
        const { activeCount } = this.props;
        const itemWord = activeCount === 1 ? 'item' : 'items';

        return (
            <span className="todo-count">
                <strong>{activeCount || 'No'}</strong> {itemWord} left
            </span>
        );
    }

    renderFilterLink(filter) {
        const title = FILTER_TITLES[filter];
        const { filter: selectedFilter, onShow } = this.props;
        const linkCls = classnames({ selected: filter === selectedFilter });
        return (
            <a className={linkCls} onClick={() => onShow(filter)}>
                {title}
            </a>
        );
    }

    renderFilter() {
        const filters = [SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED];
        return (
            <ul className="filters">
                {filters.map(filter => (
                    <li key={filter}>
                        {this.renderFilterLink(filter)}
                    </li>
                ))}
            </ul>
        );
    }

    renderClearButton() {
        const { completedCount, onClearCompleted } = this.props;
        if (completedCount > 0) {
            return (
                <button className="clear-completed" onClick={onClearCompleted} >
                    Clear completed
                </button>
            );
        }
        return null;
    }

    render() {
        return (
            <div className="footer">
                {this.renderTodoCount()}
                {this.renderFilter()}
                {this.renderClearButton()}
            </div>
        );
    }
}

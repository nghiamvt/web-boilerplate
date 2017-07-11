import React from 'react';
import PropTypes from 'prop-types';

// Add Header, Footer, SideBar here

export default function Master(props) {
	return (
    <div className="page-container">
        {props.children}
    </div>
	);
}

Master.propTypes = {
	children: PropTypes.object.isRequired,
};

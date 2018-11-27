import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

import './Switch.scss';

export default function Switch(props) {
  return (
    <div className="switch">
      <Field name="public" type="checkbox" checked={props.checked} />
      <div className="slider round">
        <span className="on">{props.onText}</span>
        <span className="off">{props.offText}</span>
      </div>
    </div>
  );
}

Switch.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onText: PropTypes.string,
  offText: PropTypes.string,
};

Switch.defaultProps = {
  checked: false,
  onText: '',
  offText: '',
};

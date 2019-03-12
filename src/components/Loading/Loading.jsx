import loadingSVG from '@/assets/images/loading.gif';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './loading.scss';

// @TODO: add timeout

export default function Loading(props) {
  if (!props.isLoading) return null;

  const cls = classNames(Loading.displayName, {
    [props.classNames]: !!props.classNames,
  });

  return (
    <div className={cls}>
      <div className="LoadingIcon">
        <img src={props.loadingIcon} alt="loading..." />
      </div>
      {props.text && <p className="LoadingText">{props.text}</p>}
    </div>
  );
}

Loading.displayName = 'Loading';
Loading.propTypes = {
  text: PropTypes.string,
  classNames: PropTypes.string,
  isLoading: PropTypes.bool,
  loadingIcon: PropTypes.any,
};
Loading.defaultProps = {
  text: '',
  classNames: '',
  isLoading: false,
  loadingIcon: loadingSVG,
};

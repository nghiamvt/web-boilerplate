import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import cx from 'classnames';

import './modal.scss';

class ModalComponent extends React.PureComponent {
  propTypes = {
    render: PropTypes.func.isRequired,
    title: PropTypes.string,
    classNames: PropTypes.string,
    onClose: PropTypes.func,
    clickOverlayToClose: PropTypes.func,
  };

  closeModal = props => {
    props.actions.closeModal({ id: props.id });
    if (props.onClose) {
      props.onClose(props);
    }
  };

  renderModalHeader = ({ title }) => {
    return title ? <div className="ModalHeader">{title}</div> : null;
  };

  renderCloseBtn = props => {
    return (
      <span
        role="link"
        tabIndex="-1"
        className="CloseBtn"
        onClick={() => this.closeModal(props)}
      />
    );
  };

  renderModalBody = ({ render, actions }) => {
    return <div className="ModalContent">{render({ actions })}</div>;
  };

  renderComponent = props => {
    const { classNames, ...restProps } = props;
    const cls = cx('ReactModal', { [classNames]: !!classNames });
    return (
      <ReactModal
        isOpen
        {...restProps}
        className={cls}
        overlayClassName="Overlay"
        onRequestClose={() => {
          if (props.clickOverlayToClose) {
            this.closeModal(props);
          }
        }}
      >
        {this.renderCloseBtn(props)}
        {this.renderModalHeader(props)}
        {this.renderModalBody(props)}
      </ReactModal>
    );
  };

  render() {
    return this.renderComponent(this.props);
  }
}

export default ModalComponent;

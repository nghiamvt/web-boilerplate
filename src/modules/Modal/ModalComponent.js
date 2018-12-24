import React from 'react';
import ReactModal from 'react-modal';
import cx from 'classnames';

import './modal.scss';

class ModalComponent extends React.PureComponent {
  renderComponent = props => {
    const cls = cx('ReactModal', {
      [props.classNames]: !!props.classNames,
    });

    return (
      <ReactModal
        isOpen
        // shouldCloseOnOverlayClick
        // shouldCloseOnEsc
        className={cls}
        overlayClassName="Overlay"
      >
        <span className="CloseBtn" onClick={props.closeModal({})} />
        <div className="ModalHeader">{props.title}</div>
        <div className="ModalContent">{props.render}</div>
      </ReactModal>
    );
  };

  render() {
    return this.renderComponent(this.props);
  }
}

export default ModalComponent;

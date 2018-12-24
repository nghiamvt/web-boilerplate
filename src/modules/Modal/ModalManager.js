import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalComponent from './ModalComponent';
import { openModal, closeModal } from './ducks';

class ModalManager extends Component {
  renderComponent = props => {
    if (!props.modals.length) return null;
    return props.modals.map(modal => {
      return (
        <ModalComponent
          {...modal}
          id={modal.id}
          actions={{ openModal: props.openModal, closeModal: props.closeModal }}
        />
      );
    });
  };

  render() {
    return this.renderComponent(this.props);
  }
}

export default connect(
  state => {
    return {
      modals: state.modals || [],
    };
  },
  { openModal, closeModal },
)(ModalManager);

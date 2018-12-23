import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalComponent from './ModalComponent';

export class ModalManager extends Component {
  renderComponent = props => {
    if (props.modals.length) return null;
    return props.modals.map(modal => {
      // TODO: modal.type
      return <ModalComponent {...modal.props} id={modal.id} />;
    });
  };

  render() {
    return this.renderComponent(this.props);
  }
}

export default connect(state => ({
  modals: state.modals,
}))(ModalManager);

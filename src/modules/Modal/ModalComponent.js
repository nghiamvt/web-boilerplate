import React from 'react';
import ReactModal from 'react-modal';

class ModalComponent extends React.PureComponent {
  renderComponent = props => {
    return <ReactModal>{props.render()}</ReactModal>;
  };

  render() {
    return this.renderComponent(this.props);
  }
}

export default ModalComponent;

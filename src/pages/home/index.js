import React from 'react';
import ReactModal from 'react-modal';

function getParent() {
  return document.querySelector('#root');
}

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };
  }

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleOpenModal}>Trigger Modal</button>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"
          shouldCloseOnOverlayClick
          parentSelector={getParent}
          onRequestClose={this.handleCloseModal}
          overlayClassName="Overlay"
        >
          Hello World
          <button onClick={this.handleCloseModal}>Close Modal</button>
        </ReactModal>
      </div>
    );
  }
}

export default Home;

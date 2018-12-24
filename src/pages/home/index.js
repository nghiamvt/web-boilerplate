import React from 'react';
import { connect } from 'react-redux';
import { openModal } from '@/modules/modal';

class Home extends React.Component {
  handleOpenModal = () => {
    // eslint-disable-next-line
    this.props.openModal({
      id: 'test',
      title: 'Basic Modal',
      clickOverlayToClose: true,
      onClose: () => console.log(11111),
      // render: () => <span>Hello World</span>,
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleOpenModal}>Trigger Modal</button>
      </div>
    );
  }
}

export default connect(
  null,
  { openModal },
)(Home);

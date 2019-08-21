import React from "react";

import AddBooksModal from "./AddBooksModal";
import RemoveBooksModal from "./RemoveBooksModal";
import EditBookModal from "./EditBookModal";

class ModalController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: null
    };
  }

  getModal = target => {
    const customProps = {
      close: this.props.handleModalToggle,
      restInterface: this.props.restInterface,
      bookShelf: this.props.bookShelf
    };
    const modals = {
      addBooksModal: <AddBooksModal {...customProps} />,
      removeBooksModal: <RemoveBooksModal {...customProps} />,
      editBookModal: (
        <EditBookModal {...customProps} bookToEdit={this.props.bookToEdit} />
      )
    };
    return modals[target] || null;
  };

  componentDidUpdate = prevProps => {
    if (prevProps.modal !== this.props.modal) {
      this.setState({
        modal: this.getModal(this.props.modal)
      });
    }
  };

  render() {
    console.log('modalcontroller', this.props);
    return <div>{this.state.modal}</div>;
  }
}

export default ModalController;

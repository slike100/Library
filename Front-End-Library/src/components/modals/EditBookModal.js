import React from "react";
import { connect } from "react-redux";


import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { editBook, getAllBooks } from "../../redux/actions/restInterfaceActions";
import { getBooksThisPage } from "../../redux/actions/paginationActions";


import "../../css/bootstrap.min.css";
import "../../css/layout.css";
import { get } from "https";

class EditBookModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.bookToEdit.title || "",
      author: props.bookToEdit.author || "",
      rating: props.bookToEdit.rating || "0",
      numPages: props.bookToEdit.numPages || "0",
      pubDate: props.bookToEdit.pubDate || "",
      synopsis: props.bookToEdit.synopsis || "",
      cover: "",
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  submitChanges = async () => {
    const editedBook = this.state;
    editedBook.id = this.props.bookToEdit.id;
    await editBook(editedBook.id, editedBook);
    this.props.getBooksThisPage();
    this.props.close();
  }

  componentDidMount() {
    document.getElementById("edit-title").focus();
  }

  render() {
    console.log(this.props);
    
    return (
      <Modal isOpen fade={false} toggle={this.props.close}>
        <ModalHeader toggle={this.props.close}>
          <p className="modal-title">Edit Book</p>
        </ModalHeader>

        <ModalBody>
          <form className="clearfix" onSubmit={this.submitChanges}>
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                name="title"
                onChange={this.handleChange}
                value={this.state.title}
                type="text"
                className="form-control"
                required={true}
                autoFocus={true}
                id="edit-title"
              />
            </div>

            <div className="row">
              <div className="form-group col-xs-9">
                <label htmlFor="author">Author *</label>
                <input
                  onChange={this.handleChange}
                  value={this.state.author}
                  name="author"
                  type="text"
                  className="form-control"
                  required={true}
                />
              </div>
              <div className="form-group col-xs-3">
                <label htmlFor="rating">Star Rating</label>
                <input
                  onChange={this.handleChange}
                  value={this.state.rating}
                  className="form-control"
                  type="number"
                  min={0}
                  max={5}
                  name="rating"
                />
              </div>
            </div>

            <div className="row">
              <div className="form-group col-xs-6">
                <label htmlFor="numPages">Pages</label>
                <input
                  onChange={this.handleChange}
                  value={this.state.numPages}
                  className="form-control"
                  type="number"
                  placeholder="300"
                  name="numPages"
                />
              </div>
              <div className="form-group col-xs-6">
                <label htmlFor="pubDate">Publication Date</label>
                <input
                  onChange={this.handleChange}
                  value={this.state.pubDate}
                  className="form-control"
                  type="date"
                  name="pubDate"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="synopsis">Synopsis</label>
              <br />
              <textarea
                onChange={this.handleChange}
                value={this.state.synopsis}
                cols="75"
                rows="5"
                maxLength="250"
                placeholder="No synopsis available."
                name="synopsis"
                className="synopsis"
              />
            </div>

            <div className="form-group">
              <label htmlFor="cover">Book cover</label>
              <input
                onChange={this.handleChange}
                value={this.state.cover}
                name="cover"
                type="file"
                accept=".jpg, .jpeg, .png"
              />
            </div>

            <button
              onClick={this.submitChanges}
              className="btn btn-default btn-add"
              type="button"
              data-dismiss="modal"
              form="editBookModalForm"
            >
              Submit Changes
            </button>
          </form>
        </ModalBody>

        <ModalFooter>
          <button variant="primary" className="btn btn-default" type="button" onClick={this.props.close}>
            Close
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapDispatchToProps = {
  getBooksThisPage,
}


export default connect(
  null,
  mapDispatchToProps,
)(EditBookModal);


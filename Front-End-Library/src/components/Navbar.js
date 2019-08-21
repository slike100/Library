import React from "react";

import "../css/bootstrap.min.css";
import "../css/layout.css";
import { suggestBook, searchForBooks } from "../redux/actions/restInterfaceActions";
import { getBooksThisPage } from "../redux/actions/paginationActions";

import { connect } from "react-redux"; // import connect from Redux


class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: ""
    };
  }

  scrollToTable = () => {
    document.getElementById("dataTable").scrollIntoView({ behavior: "smooth" });
  };

  showAllBooks = () => {
    document.getElementById("dataTable").scrollIntoView({ behavior: "smooth" });
    this.props.getBooksThisPage();
  };


  updateVal = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  searchForBooks = async e => {
    e.preventDefault();
    searchForBooks(this.state);
    this.setState({
        title: "",
        author: "",
      });
    this.scrollToTable();
  }


  suggestBook = () => {
    suggestBook();
  };

  render() {
    return (
      <nav className="row navbar navbar-default navbar-container">
        <form id="search-form" className="navbar-form text-center">
          <div className="form-group col-xs-2">
            <button
              onClick={this.showAllBooks}
              className="btn btn-default pull-left navbar-btn vert-spacing"
              type="button"
            >
              Show All Books
            </button>
          </div>

          <div className="form-group navbar-inputs-stack col-xs-8">
            <input
              onChange={this.updateVal}
              value={this.state.title}
              placeholder="Title"
              className="form-control"
              type="text"
              name="title"
            />

            <input
              onChange={this.updateVal}
              value={this.state.author}
              placeholder="Author"
              className="form-control"
              type="text"
              name="author"
            />

            <button
              data-modal-target="bookDisplayModal"
              onClick={this.searchForBooks}
              type="submit"
              className="btn btn-default navbar-btn"
            >
              Search
            </button>
          </div>

          <div className="form-group col-xs-2">
            <button
              data-modal-target="bookDisplayModal"
              onClick={this.suggestBook}
              className="btn btn-default pull-right navbar-btn vert-spacing"
              type="button"
            >
              Suggest Book
            </button>
          </div>
        </form>
      </nav>
    );
  }
}

const mapDispatchToProps = {
  getBooksThisPage,
  // suggestBook: () => suggestBook().then(action => dispatch(action)),
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     updateDisplay: () => dispatch(updateDisplay()),
//   }
// }

export default connect(
  null,
  mapDispatchToProps,
)(Navbar);

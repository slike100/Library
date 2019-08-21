import React from "react";
import { Table, ButtonGroup } from "reactstrap";

import "../css/bootstrap.min.css";
import "../css/layout.css";
import { deleteBookById } from "../redux/actions/restInterfaceActions";
import { nextPage, getBooksThisPage, previousPage } from "../redux/actions/paginationActions";


import { connect } from "react-redux";

const DataTable = (props) => {
  function _createTable(bookArr) {
    const tableContent = bookArr.map((book, index) => (
      <tr key={index} data-book-id={book.id}>
        {_createRow(book)}
      </tr>
    ));
    return tableContent;
  }

  function _createHead() {
    const columns = [
      "Title",
      "Author",
      "Cover",
      "Synopsis",
      "Num Pages",
      "Pub Date",
      "Rating",
      "Delete"
    ];
    return columns.map((column, index) => <th key={index}>{column}</th>);
  }

  function _createRow(book) {
    const rowSections = [
      "title",
      "author",
      "cover",
      "synopsis",
      "numPages",
      "pubDate",
      "rating"
    ];

    const row = rowSections.map((prop, index) => {
      // console.log('VALUE: ', book[prop], '\nPROP: ', prop)
      return (
        <td
          key={`${index}-${book.id}`}
          onClick={() => toggleEditModal(book.id)}
          className={prop === "synopsis" ? "synopsis-stretch" : ""}
        >
          {_formatTableContent(book, prop)}
        </td>
      );
    });

    row.push(
      <td key={`${rowSections.length + 1}-${book.id}`}>
        <input type="checkbox" onClick={() => confirmDelete(book.id)} />
      </td>
    );
    return row;
  }

  function _formatTableContent(book, prop) {
    switch (prop) {
      case "id":
        return null;
      case "cover":
        return (
          <img
            src={book[prop] || "../assets/generic_cover.png"}
            alt="book cover"
            className="tableImg"
          />
        );
      case "rating":
        return _createStars(book[prop]);
      case "synopsis":
        return <p>{book[prop] ? book[prop].slice(0, 40) : ""}...</p>;
      default:
        return book[prop];
    }
  }

  function _createStars(rating) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span className={`fa fa-star ${i < rating ? "checked" : ""}`} key={i} />
      );
    }
    return <div>{stars}</div>;
  }

  async function toggleEditModal(id) {
    await props.populateEditModalInputs(id);
    props.handleModalToggle("editBookModal");
  }

  async function confirmDelete(id) {
    let bookToDelete = props.booksToDisplay.find(book => book.id === id);
    let proceed = window.confirm(
      `Are you sure you want to delete ${bookToDelete.title}, by ${
        bookToDelete.author
      }`
    );
    if(proceed) {
      await deleteBookById(id);
      props.getBooksThisPage();
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  var updateNext = () => {
    props.nextPage();
    props.getBooksThisPage();
  }


  var updateBack = () => {
    props.previousPage();
    props.getBooksThisPage();
  }


  const tableHead = _createHead();
  const tableBody = _createTable(props.booksToDisplay);

  console.log('ReREnded');
  return (
    <div id="dataTable">
      <p className="modal-title">Books</p>

      <Table>
        <thead>
          <tr>{tableHead}</tr>
        </thead>

        <tbody>{tableBody}</tbody>
      </Table>

      <ButtonGroup className="btn-group">
        <button
          onClick={updateBack}
          className="btn btn-default"
          type="button"
        >
          Previous Page
        </button>
        <button onClick={scrollToTop} className="btn btn-default" type="button">
          Back to Top
        </button>
        <button
          onClick={updateNext}
          className="btn btn-default"
          type="button"
        >
          Next Page
        </button>
      </ButtonGroup>
    </div>
  );
};

const mapDispatchToProps = {
  nextPage,
  getBooksThisPage,
  previousPage,
}

function mapStateToProps(state) {
  console.log("REDUX STATE: ", state);
  return {
    booksToDisplay: state.booksToDisplay,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DataTable);

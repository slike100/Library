import React from "react";
import { connect } from "react-redux"; // import connect from Redux
import Header from "./Header";
import Jumbotron from "./Jumbotron";
import Navbar from "./Navbar";
import Footer from "./Footer";
import DataTable from "./DataTable";
import ModalController from "./modals/ModalController";
// here we import one of our "action-creators" which is used to update our Redux state
// (see mapStateToProps and mapDispatchToProps below)
import { getAllBooks } from "../redux/actions/restInterfaceActions";
import { getBooksThisPage } from "../redux/actions/paginationActions";


import "../css/bootstrap.min.css";
import "../css/layout.css";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // BONUS TODO: MOVE THIS TO REDUX
      modal: null,
      // *** TODO ***
      // these properties have been established as initial state in Redux
      // move the associated logic and make them accessible globally.  See ../redux/initialState

    };
  }

  handleModalToggle = modalToOpen => {
    // BONUS TODO: MOVE TO REDUX
    this.setState({
      modal: modalToOpen
    });
  };

  populateEditModalInputs = id => {
    // BONUS TODO: MOVE TO REDUX
    const bookToEdit = this.props.bookShelf.find(book => book.id === id);
    bookToEdit.id = id;
    this.setState({
      bookToEdit
    });
  };


  async componentDidMount() {
    // see mapDispatchToProps below
    await getAllBooks();
    this.props.getBooksThisPage();
  }

  render() {
    console.log("MAIN COMPONENT PROPS: ", this.props);
    return (
      <div>
        {/* BONUS TODO: MOVE TO REDUX */}
        <Header handleModalToggle={this.handleModalToggle} />

        <Jumbotron />

        <Navbar
          handleModalToggle={this.handleModalToggle}
        />

        <ModalController
          modal={this.state.modal} // BONUS TODO: MOVE TO REDUX
          handleModalToggle={this.handleModalToggle}
          bookToEdit={this.state.bookToEdit}
        />

        <DataTable
          handleModalToggle={this.handleModalToggle}
          populateEditModalInputs={this.populateEditModalInputs}
        />

        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps =  {
  getBooksThisPage,
}

function mapStateToProps(state) {
  console.log("REDUX STATE: ", state);
  return {
    bookShelf: state.bookShelf,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

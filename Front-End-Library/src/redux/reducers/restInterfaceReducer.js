import {
  GET_ALL_BOOKS,
  ADD_BOOKS,
  REMOVE_BOOKS,
  EDIT_BOOK,
  SEARCH_FOR_BOOKS,
  SUGGEST_BOOK,
  DELETE_BOOK_BY_ID,
  UPDATE_DISPLAY,
} from "../types/restInterfaceTypes";

import {
  NEXT_PAGE,
  PREVIOUS_PAGE,
  GET_BOOKS_THIS_PAGE,
} from "../types/paginationTypes";


const initialState = {
  bookShelf: [],
  booksToDisplay: [],
  bookToEdit: {},
  pageNum: 1,
  resultsPerPage: 5,
  resultsThisPage: [],
}

// export (as the default) our reducer function which takes in state and an action
export default function restInterfaceReducer(state = initialState, action) {
  const { type, payload } = action;

  // switch over the action's type and return the appropriate updated copy of our state
  switch (type) {
    case GET_ALL_BOOKS:
      console.log(payload);
      // use the spread operator to return a copy of our previous state, modifying only the applicable properties
      return Object.assign({}, state, {
        bookShelf: payload,
      });
      // return ({ ...state, bookShelf: payload},{...state, booksToDisplay: payload });

    case ADD_BOOKS:
      const { bookShelf } = state;
      return {...state, bookShelf: [...payload, ...bookShelf]};

    case EDIT_BOOK:
      console.log(type)
      var indexOfEdit = state.bookShelf.findIndex(function(ele){
        return ele.id === payload.id
      });
      let tempArr1 = [...state.bookShelf]
      tempArr1.splice(indexOfEdit, 1, payload);
      return {...state, bookShelf: tempArr1}

    case SEARCH_FOR_BOOKS:
      return {...state, booksToDisplay: payload};

    case SUGGEST_BOOK:
      return Object.assign({}, state, {
        booksToDisplay: [payload],
      });

    case DELETE_BOOK_BY_ID:
      const newBookShelf = state.bookShelf.filter(books => books.id != payload);
      return { ...state, bookShelf: newBookShelf};
  

    case GET_BOOKS_THIS_PAGE:
      console.log("GETBOOKSTHISPAGE WE ARE HERE")
      const { pageNum, resultsPerPage } = state;
      if (state.bookShelf.length > state.resultsPerPage) {
        const tempArr = [...state.bookShelf].slice(((pageNum - 1) * resultsPerPage), (resultsPerPage * pageNum));
        return {
          ...state,
          booksToDisplay: tempArr,
        }
      } else {
        return {
          ...state,
          booksToDisplay: state.bookShelf,
        }
    }
  
    case NEXT_PAGE:
      const lastPage = Math.ceil(state.bookShelf.length / state.resultsPerPage);
      if (state.pageNum < lastPage) {
        return {
            ...state,
            pageNum: state.pageNum + 1,
          }
      } else {
        alert("This is the last page");
        return state;
      }

    case PREVIOUS_PAGE:
      if (state.pageNum > 1) {
        return {
          ...state,
          pageNum: state.pageNum - 1,
        }
      } else alert("This is the first page");
     
    
    default:
      return state;
  }
}



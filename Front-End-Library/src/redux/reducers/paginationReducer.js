import {
  NEXT_PAGE,
  PREVIOUS_PAGE,
  GET_BOOKS_THIS_PAGE
} from "../types/paginationTypes";

const initialState = {
  pageNum: 1,
  resultsPerPage: 5,
  resultsThisPage: [],
}

// export (as the default) our reducer function which takes in state and an action
export default function paginationReducer(state = initialState, action) {
  // switch over the action's type and return the appropriate updated copy of our state
  switch (action.type) {
    case GET_BOOKS_THIS_PAGE:
      // TODO
      break;

    case NEXT_PAGE:
      // TODO
      break;

    case PREVIOUS_PAGE:
      // TODO
      break;
    // default statement to return our state (this is necessary because all reducers will fire regardless of the action dispatched)
    default:
      return state;
  }
}

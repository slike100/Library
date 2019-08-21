import {
  NEXT_PAGE,
  PREVIOUS_PAGE,
  GET_BOOKS_THIS_PAGE
} from "../types/paginationTypes";

export const nextPage = () => {
  return {
    type: NEXT_PAGE,
  }
}

export const previousPage = () => {
  return {
    type: PREVIOUS_PAGE,
  }
}

export const getBooksThisPage = () => {
  console.log('ingetallbooks action');
  return {
    type: GET_BOOKS_THIS_PAGE,
  }
}
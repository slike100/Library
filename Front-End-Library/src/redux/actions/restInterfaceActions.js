import axios from "axios";
import store from "../store";

import { baseUrl, numResults, defaultAxiosConfig } from "../../util/globalConstants";
import {
  sortBooksById,
  setFallbackValues
  // unique
} from "../../util/helperFunctions";

import {
  GET_ALL_BOOKS,
  ADD_BOOKS,
  EDIT_BOOK,
  SEARCH_FOR_BOOKS,
  SUGGEST_BOOK,
  DELETE_BOOK_BY_ID,
  UPDATE_DISPLAY,
} from "../types/restInterfaceTypes";

// TODO console.log(store) here to see what methods we're given to update, read and manage our state

export function getAllBooks() {
  return axios
    .get(`${baseUrl}${numResults}`)
    .then((res) => {
      // make our fetch call and if the response comes back (success
      if (res.status === 200 && res.data && res.data.length) {
        console.log(`SUCCESS! Got ${res.data.length} books.`);

        // sort our books and handle errors (similar to the original Book constructor)
        const allBooks = setFallbackValues(sortBooksById(res.data));

        // define an action with a type and payload to dispatch to our reducers
        const action = {
          type: GET_ALL_BOOKS,
          payload: allBooks,
        };
        // call store.dispatch, passing the action so the reducer can recieve it and update the state
        store.dispatch(action);
      }
    })
    .catch((err) => {
      console.log("Error getting all books: ", err);
      // define an action with a type and payload (empty Array here) to dispatch to our reducers
      const action = {
        type: GET_ALL_BOOKS,
        payload: [],
      };
      // call store.dispatch, passing the action so the reducer can recieve it and update the state
      store.dispatch(action);
    });
}

export function addBooks(bookArr) {
  return axios
    .post(`${baseUrl}`, { books: bookArr })
    .then((res) => {
      // make our fetch call and if the response comes back (success)
      if (res.status === 200 && res.data === "successfully added books") {
        console.log(`SUCCESS! Added ${bookArr.length} books.`);

        // sort our books and handle errors (similar to the original Book constructor)
        const addedBooks = setFallbackValues(sortBooksById(bookArr));
        console.log(addedBooks)
        // TODO dispatch an action with a type ADD_BOOKS and a payload of addedBooks
        const action = {
          type: ADD_BOOKS,
          payload: addedBooks,
        }
        store.dispatch(action);
      }
    })
    .catch((err) => {
      console.log("Error adding books: ", err);
      const action = {
        type: ADD_BOOKS,
        payload: [],
      }
      store.dispatch(action);
    });
}

export async function removeBooks(params) {
  const { title, author } = params;
    try {
      let res = await axios.delete(
        `${baseUrl}deleteBy/?title=${title}&author=${author}`,
        defaultAxiosConfig
      );
      if (res.status === 200 && res.data) {
        console.log(`SUCCESS! Deleted ${res.data} books.`);
        console.log(res.data)
        getAllBooks();
      }
    } catch (err) {
      console.log("Error removing books: ", err);
    }
}

export async function editBook(id, updatedBook) {
  console.log(updatedBook);
  axios.put(`${baseUrl}update/${id}`, updatedBook)
      .then(async (res) => {
        console.log(res);
        const action = {
          type: EDIT_BOOK,
          payload: res.data,
        };
        await store.dispatch(action);
        return (console.log("edit book return"));
      })
      .catch(err => console.log(err));
}

export async function searchForBooks(paramsObj) {
    console.log('searchForBook called: ', paramsObj);
    axios.get(`${baseUrl}searchBy/?title=${paramsObj.title}&author=${paramsObj.author}`)
      .then((res) => {
        if (!(res.data[0] instanceof Object)) {
          console.log('no Books found');
          // this.setState({ alertHide: false, isOpen: true });
        } else {
          console.log(typeof res.data);
          const action = {
            type: SEARCH_FOR_BOOKS,
            payload: res.data,
          };
          store.dispatch(action);
        }
      })
    .catch(err => console.log(err));
}

export async function suggestBook() {
  try {
    let res = await axios.get(
      `${baseUrl}random`,
      defaultAxiosConfig
    );
    if (res.data && res.data.length) {
      console.log(`SUCCESS! Got a book with the id ${res.data[0]}.`);
          const action = {
            type: SUGGEST_BOOK,
            payload: res.data[0],
          };
          // call store.dispatch, passing the action so the reducer can recieve it and update the state
          store.dispatch(action);
        }
  } catch (err) {
    console.log("Error getting a random book", err);
  }
}

export function deleteBookById(id) {
  console.log('deleteBookById called: ', id)
   return axios
    .delete(`${baseUrl}deleteById/${id}`)
      .then((res) => {
        console.log(res.data.id);
        if (res.status === 200) {
          const id = res.data.id;
          const action = {
            type: DELETE_BOOK_BY_ID,
            payload: id,
          };
          store.dispatch(action);
        }
      })
    .catch((err) => err);
}

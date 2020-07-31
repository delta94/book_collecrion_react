import { all } from "redux-saga/effects";

import {
  watchGetBooks,
  watchRegisterBook,
  watchGetMyBooks,
} from "./books_saga";

export default function* rootSaga() {
  yield all([watchGetBooks(), watchRegisterBook(), watchGetMyBooks()]);
}

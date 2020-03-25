import { all, takeLatest, put, select } from "redux-saga/effects";
import constants from "./actionTypes";


function* homeSaga(action) {
  try {

  } catch (e) {

  }
}

function* homePageSaga() {
  yield all([
    takeLatest(constants.FETCH_BLOGS, homeSaga),
  ]);
}

export default homePageSaga;

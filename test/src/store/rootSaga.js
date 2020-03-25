import { all } from "redux-saga/effects";
import homePageSaga from "./homePage/saga";


export default function* rootSaga() {
  yield all([
    homePageSaga()

  ]);
}

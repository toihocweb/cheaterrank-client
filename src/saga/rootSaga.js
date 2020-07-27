import { put, all, takeLatest, delay } from "redux-saga/effects";
import {
  FETCHING_TESTS,
  GETTING_TEST,
  GET_TESTS,
  GET_TEST,
  GET_RESULT,
  GETTING_RESULT,
  GET_LOADING,
  GETTING_LOADING,
  GET_ERROR,
} from "./types";
import { getTests } from "./getTests";
import { getResults } from "./getResults";

function* getAllTests() {
  try {
    const data = yield getTests();
    yield put({ type: GET_TESTS, data });
  } catch (error) {}
}

function* getTest(action) {
  try {
    yield put({ type: GET_RESULT, result: null });
    yield put({ type: GET_ERROR, error: "" });
    yield put({ type: GET_TEST, data: action.data });
  } catch (error) {}
}

function* getResult(action) {
  try {
    const data = yield getResults(action.userCode);
    yield put({ type: GET_RESULT, data });
    yield delay(1000);
    yield put({ type: GET_LOADING, isLoading: false });
  } catch (error) {
    yield delay(1000);
    yield put({ type: GET_LOADING, isLoading: false });
    yield put({ type: GET_ERROR, error });
  }
}

function* getLoading(action) {
  try {
    yield put({ type: GET_LOADING, isLoading: action.isLoading });
  } catch (error) {}
}

function* rootSaga() {
  yield all([
    takeLatest(FETCHING_TESTS, getAllTests),
    takeLatest(GETTING_TEST, getTest),
    takeLatest(GETTING_RESULT, getResult),
    takeLatest(GETTING_LOADING, getLoading),
  ]);
}

export default rootSaga;

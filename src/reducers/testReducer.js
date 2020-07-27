import { GET_TESTS, GET_TEST } from "../saga/types";

const initialState = {
  tests: [],
  currentTest: null,
};

const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TESTS:
      return {
        ...state,
        currentTest: { ...action.data[0] },
        tests: [...action.data],
      };
    case GET_TEST:
      const id = action.data;
      const current = state.tests.find((val) => val.id === id);
      return {
        ...state,
        currentTest: { ...current },
      };
    default:
      return state;
  }
};

export default testReducer;

import {
  FETCHING_TESTS,
  GETTING_TEST,
  GETTING_RESULT,
  GETTING_LOADING,
} from "../../saga/types";

export const fetchingTests = () => {
  return {
    type: FETCHING_TESTS,
  };
};

export const gettingTest = (id) => {
  return {
    type: GETTING_TEST,
    data: id,
  };
};

export const gettingResult = (userCode) => {
  return {
    type: GETTING_RESULT,
    userCode,
  };
};

export const gettingLoading = (isLoading) => {
  return {
    type: GETTING_LOADING,
    isLoading,
  };
};
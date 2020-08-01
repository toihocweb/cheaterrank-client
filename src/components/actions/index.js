import {
  FETCHING_TESTS,
  GETTING_TEST,
  GETTING_RESULT,
  GETTING_LOADING,
  POSTING_LOGIN,
  SET_CURRENT_USER,
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

export const postingLogin = (data) => {
  return {
    type: POSTING_LOGIN,
    data,
  };
};

export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    data: user,
  };
};

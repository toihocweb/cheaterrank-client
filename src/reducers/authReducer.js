import { POST_LOGIN } from "../saga/types";

const initialState = {
  currentUser: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_LOGIN:
      return {
        ...state,
        currentUser: action.data,
      };

    default:
      return state;
  }
};

export default authReducer;

import Axios from "axios";

export const getResults = async (userCode) => {
  try {
    /*eslint-disable no-eval */

    const res = await Axios.post("http://localhost:5000/test", userCode);
    return eval("(" + res.data + ")");
  } catch (error) {
    return error.response.data;
  }
};

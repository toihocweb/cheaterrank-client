import Axios from "axios";

export const getResults = async (userCode) => {
  try {
    /*eslint-disable no-eval */

    let res = await Axios.post("http://localhost:5000/test/", userCode);

    if (res.data.includes("Error")) {
      return res.data;
    } else {
      console.log(eval("(" + res.data + ")"));
      return eval("(" + res.data + ")");
    }
  } catch (error) {}
};

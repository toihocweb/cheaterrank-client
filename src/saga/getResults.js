import Axios from "axios";

export const getResults = async (userCode) => {
  try {
    /*eslint-disable no-eval */

    let res = await Axios.post("https://toihocweb.net/api/test", userCode);

    if (res.data.includes("Error")) {
      return res.data;
    } else {
      return eval("(" + res.data + ")");
    }
  } catch (error) {}
};

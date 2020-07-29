import Axios from "axios";

export const getTests = async () => {
  const res = await Axios.get("http://localhost:8000/api/cheaterrank/tests");
  return res.data;
};

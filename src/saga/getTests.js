import Axios from "axios";
import { apiUrl } from "../utils /api";

export const getTests = async () => {
  const res = await Axios.get(`${apiUrl}/api/cheaterrank/tests`);
  return res.data;
};

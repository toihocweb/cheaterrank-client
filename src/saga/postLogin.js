import Axios from "axios";
import { apiUrl } from "../utils/api";

export const login = async (dataPost) => {
  console.log("dataPost", dataPost);
  const res = await Axios.post(
    `${apiUrl}/api/v1/cheaterrank/auth/login`,
    dataPost
  );
  return res.data;
};

import axios from "axios";
import dotenv from "dotenv";
import restfulBooker from "$root/page/restful-booker";
import * as data from "$root/data/restful-data";

dotenv.config();

const authorizeBaseAPI = async () => {
  const responseCreateToken = await restfulBooker.createToken(
    data.VALID_CREATE_TOKEN
  );
  return axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      Cookie: `token=${responseCreateToken.data.token}`,
      Authorization: "YWRtaW46cGFzc3dvcmQxMjM=]",
    },
    validateStatus: function () {
      return true;
    },
  });
};

export default authorizeBaseAPI;

import axios from "axios";

// import { config } from "../config/config";
const packageJson = require("../../package.json");

export const invokeApi = async (url, params) => {
  try {
    let headers = {
      "Content-Type": "application/json",
      appversion: packageJson.version,
      platform: "web",
    };

    return await axios.post(url, params, { headers: headers });
  } catch ({ response }) {
    return response;
  }
};

export const invokeFormDataApi = async (url, formData) => {
  try {
    let headers = {
      "Content-Type": "multipart/form-data",
      appversion: packageJson.version,
      platform: "web",
    };

    return await axios.post(url, formData, { headers: headers });
  } catch ({ response }) {
    return response;
  }
};

export const apiList = {
    // getUserByEmail: "/user/login",
    sendOtp: "/api/otp/request-otp/v1",
    loginByOTP: "/api/otp/verify-otp/v1"
};

import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

const auth = JSON.parse(localStorage.getItem("persist:root"))?.auth;
const token = auth && JSON.parse(auth).token;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${token}` },
});
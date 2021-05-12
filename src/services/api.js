import axios from "axios";

export const api = axios.create({
  baseURL: "http://my-json-server.typicode.com/luancma/json-tasks",
});

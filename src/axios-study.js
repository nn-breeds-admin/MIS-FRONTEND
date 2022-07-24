import axios from "axios";

const baseURL = "https://mis-backend-app.herokuapp.com/";

const instance = axios.create({
  baseURL: baseURL,
});

export default instance;
export { baseURL };

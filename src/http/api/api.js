import axios from "axios";

export const apiUrl = "https://api.todoist.com/rest/v2";

const api = axios.create({
  baseURL: apiUrl,
});



export default api;

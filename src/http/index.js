import axios from "axios";

const token = '00547228537484681c8d42c473fbc848e01b3759';
const apiUrl = 'https://api.todoist.com/rest/v2';
//удалить эти переменные из файла .env в production

const api = axios.create({
  baseURL: apiUrl,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${ token }`;
  return config;
}, (error) => {
  console.error( 'Error in request interceptor:', error );
  return Promise.reject( error );
});

export default api;

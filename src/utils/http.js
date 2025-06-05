import axios from "axios";

const http = axios.create({
    baseURL : import.meta.env.VITE_BASE_URL || 'http://localhost:3000',
    timeout : 10000
})


http.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
)

http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.log(error.response)
    const status = error.response.status;

    if(status === 401){
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/auth'
      console.error('API ERROR', error.response || error.message);
      return Promise.reject(error.response?.data || error);
    }
  
  }
);


export default http;
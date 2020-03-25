import axios from "axios";

const baseUrl = "http://localhost:5000/api;

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
export const fetchBlogsApi = () => {
	 return axios.get(`${baseUrl}/blogs`,config).then(data => data.data);
}
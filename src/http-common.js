import axios from "axios";

export default axios.create({
  baseURL:  'https://mywebsitevm.azurewebsites.net/api',
  headers: {
    "Content-type": "application/json"
  }
});
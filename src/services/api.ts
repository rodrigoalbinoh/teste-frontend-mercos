import axios from 'axios';

const originalURL = 'https://sandbox.mercos.com/api-teste-front';

const api = axios.create({
  baseURL: `https://cors-anywhere.herokuapp.com/${originalURL}`,
});

export default api;

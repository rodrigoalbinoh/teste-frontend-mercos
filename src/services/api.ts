import axios from 'axios';

const originalURL = 'https://sandbox.mercos.com/api-teste-front';
const endpointURL = `https://cors-anywhere.herokuapp.com/${originalURL}`;

const api = axios.create({
  baseURL: endpointURL,
});

export default api;

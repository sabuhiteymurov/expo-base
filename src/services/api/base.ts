import axios from 'axios';

export const baseURL = 'https://localhost:3000/api/';

export const mockAPI = axios.create({
  baseURL,
});

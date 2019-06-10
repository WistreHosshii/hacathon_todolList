import axios from 'axios';
import App from './App';

const url = 'http://hackathon-test-server.jichoup.trap.show/';
export const get = () => {
  return axios.get(url);
};
export const post = (value: string) => {
  return axios.post(url, value);
};
export const deletee = (index: String) => {
  axios.delete(url);
};

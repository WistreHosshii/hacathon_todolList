import axios from 'axios';
import App from './App';

const url = 'http://hackathon-test-server.jichoup.trap.show/';
export const get = () => {
  return axios.get(url);
};
export const post = (value: string) => {
  const content = { content: value };
  return axios.post(url, content);
};
export const deletee = (index: String) => {
  axios.delete(url);
};

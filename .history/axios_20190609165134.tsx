import axios from 'axios';
import App from './App';

const url = 'http://hackathon-test-server.jichoup.trap.show/';
export const get = () => {
  axios.get(url).then(response => {
    console.log(response.data);
    App.setState();
  });
};
export const post = (value: Todo) => {
  axios.post(url, value);
};

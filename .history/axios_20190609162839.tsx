import axios from 'axios';

const url = 'http://hackathon-test-server.jichoup.trap.show/';
export const get = () => {
  axios.get(url).then(response => {
    console.log(response.data);
    retun response.data
  });
};

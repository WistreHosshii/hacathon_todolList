import axios from 'axios';
import App from './App';

const url = 'http://hackathon-test-server.jichoup.trap.show/';
export const get = () => {
  return axios.get(url);
};
export const post = (value: string) => {
  const content: TodoList.Post.Request = { content: value };
  return axios.post(url, content);
};
export const deleteTask = (id: string) => {
  // const id: TodoList.Delete.Request = { id: _id };
  console.log({ data: id });
  axios.delete(url, { data: id });
};

import axios from 'axios';

const url = process.env.NODE_ENV === 'development' ? 'http://hackathon-test-server.jichoup.trap.show' : '/api/';
export const Get = () => {
  return axios.get(url);
};
export const Post = (value: string) => {
  const content: TodoList.Post.Request = { content: value };
  return axios.post(url, content);
};
export const DeleteTask = (_id: string) => {
  const id: TodoList.Delete.Request = { id: _id };
  return axios.delete(url, { data: id });
};

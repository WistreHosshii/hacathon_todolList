import React, { Component } from 'react';
import { get, post, deleteTask } from './axios';
import styled from 'styled-components';

const CustomizedText = styled.div`
  font-size: 4rem;
  color: red;
  text-align: center;
`;
const Body = styled.div`
  width: 100%;
  font-size: 1rem;
`;
const JobTable = styled.table`
  text-align: left;
  margin: 0 auto;
  width: 70%;
  border: solid 1px black;
`;
const Button = styled.div`
  display: table-cell;
`;
const TableWrapper = styled.div`
  position:relative;
`
interface Props {}
interface State {
  todos: Todo[];
  value: string;
}

export default class App extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      todos: [],
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    get().then(response => {
      const todos: Todo[] = response.data.todos;
      this.setState({ todos });
    });
  }
  addTaskHandler() {
    if (this.state.value !== '') {
      post(this.state.value).then(response => {
        const todo: Todo = response.data;
        this.setState(state => ({ todos: [...state.todos, todo] }));
        this.setState({ value: '' });
      });
    }
  }
  deleteTaskHandler(id: string) {
    deleteTask(id).then(response => {
      const todos = this.state.todos.filter(v => v.id !== id);
      this.setState({ todos });
    });
  }
  handleChange(event: any) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <Body>
        <div className="todoList">
          <CustomizedText>TODO LIST</CustomizedText>
          <TableWrapper>
            <JobTable>
              <tbody>
                <tr>
                  <th>content</th>
                  <th>Created At</th>
                  <th>削除</th>
                </tr>

                {this.state.todos.reverse().map((todo, i) => {
                  return (
                    <tr key={i}>
                      <td>{todo.content}</td>
                      <td>{new Date(todo.createdAt).toLocaleString()}</td>
                      <td>
                        <button
                          onClick={() => {
                            this.deleteTaskHandler(todo.id);
                          }}
                        >
                          削除!
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </JobTable>
            <Button className="computeTaskWrapper">
            <input type="text" value={this.state.value} onChange={this.handleChange} />
            <button
              className="btn"
              onClick={() => {
                this.addTaskHandler();
              }}
            >
              add Task!
            </button>
          </Button>
          </div>
          
        </div>
      </Body>
    );
  }
}

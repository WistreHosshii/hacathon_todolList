import React, { Component } from 'react';
import { get, post, deleteTask } from './axios';
import styled from 'styled-components';
import console = require('console');

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
  width: 100%;
  border: solid 1px black;
`;
const Form = styled.div`
  padding-top: 15px;
`;
const TableWrapper = styled.div`
  margin: 0 auto;
  width: 70%;
`;
interface Props {}
interface State {
  todos: Todo[];
  value: string;
}

export default class Timer extends Component<Props, State> {
  private timerID!: number;
  constructor(props: any) {
    super(props);
    this.state = {
      todos: [],
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateTable = this.updateTable.bind(this);
  }

  componentDidMount() {
    this.updateTable();
    this.timerID = setInterval(() => this.updateTable(), 5000);
  }
  componentWillUnmount(): void {
    clearInterval(this.timerID);
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
    deleteTask(id).then(() => {
      const todos = this.state.todos.filter(v => v.id !== id);
      this.setState({ todos });
    });
  }
  handleChange(event: any) {
    this.setState({ value: event.target.value });
  }
  updateTable() {
    get().then(response => {
      const todos: Todo[] = response.data.todos;
      this.setState({ todos });
      console.log('Get success');
    });
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

                {this.state.todos
                  .slice()
                  .reverse()
                  .map((todo, i) => {
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
            <Form className="computeTaskWrapper">
              <input type="text" value={this.state.value} onChange={this.handleChange} />
              <button
                className="btn"
                onClick={() => {
                  this.addTaskHandler();
                }}
              >
                add Task!
              </button>
            </Form>
          </TableWrapper>
        </div>
      </Body>
    );
  }
}

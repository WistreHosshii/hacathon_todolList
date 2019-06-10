import React, { Component } from 'react';
import { get, post, deleteTask } from './axios';

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
      console.log(response.data);
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
    window.setTimeout(() => {
      console.log(this.state);
    }, 1000);
  }
  deleteTaskHandler(id: string) {
    deleteTask(id).then(response => {
      const todos = this.state.todos.filter(v => 
        v.id !== id;
      );
      this.setState({ todos });
    });
  }
  handleChange(event: any) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div>
        <div className="todoList">
          <div className="title">TODO LIST</div>
          <div className="contents">
            <table>
              <tbody>
                <tr>
                  <th>完了</th>
                  <th>未完了</th>
                  <th>削除</th>
                </tr>

                {this.state.todos.map((todo, i) => {
                  return (
                    <tr key={i}>
                      <td>{todo.content}</td>
                      <td />
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
            </table>
          </div>
          <div className="computeTaskWrapper">
            <input type="text" value={this.state.value} onChange={this.handleChange} />
            <button
              className="btn"
              onClick={() => {
                this.addTaskHandler();
              }}
            >
              add Task!
            </button>
          </div>
        </div>
      </div>
    );
  }
}

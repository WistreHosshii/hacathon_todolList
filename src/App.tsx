import React, { Component } from 'react';
import TodoList from './Component/Table';
import AddTask from './Component/AddTask';
import { Get, DeleteTask, Post } from './component/axios';
import { Route, Link } from 'react-router-dom';

export type Pages = 'List' | 'AddTask';

interface State {
  //page: Pages;
  todos: Todo[];
  value: string;
}

export default class App extends Component<{}, State> {
  private timerID!: number;
  constructor(props: any) {
    super(props);
    this.state = {
      //page: 'List',
      todos: [],
      value: '',
    };

    this.updateTable = this.updateTable.bind(this);
  }
  componentDidMount() {
    this.updateTable();
    this.timerID = setInterval(() => this.updateTable(), 5000);
  }
  componentWillUnmount(): void {
    clearInterval(this.timerID);
  }

  deleteTaskHandler = (id: string) => {
    DeleteTask(id).then(() => {
      const todos = this.state.todos.filter(v => v.id !== id);
      this.setState({ todos });
    });
  };
  addTaskHandler = (value: string) => {
    if (value !== '') {
      Post(value).then(response => {
        const todo: Todo = response.data;
        this.setState(state => ({ todos: [todo, ...state.todos] }));
        this.setState({ value: '' });
      });
    }
  };

  updateTable() {
    Get().then(response => {
      const todos: Todo[] = response.data.todos.reverse();
      this.setState({ todos });
      console.log('Get success');
    });
  }

  // changePage = (page: Pages) => {
  //   this.setState({ page });
  //   console.log(this.state.page);
  // };
  render() {
    return (
      <div>
        <Link to="/">Home | </Link>
        <Link to="/addTask">addTask</Link>
        <Route
          exact
          path="/"
          render={() => (
            <TodoList
              deleteTaskHandler={this.deleteTaskHandler}
              todos={this.state.todos}
              /*changePage={this.changePage}*/
            />
          )}
        />
        <Route
          path="/addTask"
          render={() => (
            <AddTask addTaskHandler={this.addTaskHandler} todos={this.state.todos} /*changePage={this.changePage}*/ />
          )}
        />
      </div>
    );
  }
}

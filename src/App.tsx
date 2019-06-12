import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import TodoList from './component/Table';
import AddTask from './component/AddTask';
import { Get, DeleteTask, Post } from './component/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

export type Pages = 'List' | 'AddTask';
const CustomizedText = styled.div`
  font-size: 4rem;
  color: red;
  text-align: center;
`;

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
        <div />
        <CustomizedText>
          TODO LIST
          <FontAwesomeIcon icon={faCoffee} />
        </CustomizedText>
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

import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import TodoList from './components/Table';
import AddTask from './components/AddTask';
import { Get, DeleteTask, Post } from './components/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faHome, faPlus } from '@fortawesome/free-solid-svg-icons';

export type Pages = 'List' | 'AddTask';
const CustomizedText = styled.div`
  font-size: 4rem;
  color: red;
  text-align: center;
`;
const PageRouter = styled.div`
  font-size: 2rem;
  padding: 10px;
`;

interface State {
  todos: Todo[];
  value: string;
}

export default class App extends Component<{}, State> {
  private timerID!: number;
  constructor(props: any) {
    super(props);
    this.state = {
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

  render() {
    return (
      <div>
        <div />
        <CustomizedText>
          TODO LIST
          <FontAwesomeIcon icon={faCoffee} style={{ fontSize: '3rem' }} />
        </CustomizedText>
        <PageRouter>
          <FontAwesomeIcon icon={faHome} />
          <Link to="/">Home </Link>
          <FontAwesomeIcon icon={faPlus} />
          <Link to="/addTask"> addTask</Link>
        </PageRouter>
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

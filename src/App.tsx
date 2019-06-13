import React, { Component } from 'react';
import 'react-tabs/style/react-tabs.css';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import { Get, DeleteTask, Post } from './components/axios';
import Pages from './components/Pages';

export type Pages = 'List' | 'AddTask';

const CustomizedText = styled.div`
  font-size: 4rem;
  color: red;
  text-align: center;
  padding-bottom: 15px;
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
      <React.Fragment>
        <CustomizedText>
          TODO LIST
          <FontAwesomeIcon icon={faCoffee} style={{ fontSize: '3rem' }} />
        </CustomizedText>
        <Router>
          <Route
            path="/"
            render={match => (
              <Pages
                deleteTaskHandler={this.deleteTaskHandler}
                addTaskHandler={this.addTaskHandler}
                todos={this.state.todos}
                _props={match}
              />
            )}
          />
        </Router>
      </React.Fragment>
    );
  }
}

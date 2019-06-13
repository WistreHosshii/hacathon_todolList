import React, { Component } from 'react';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
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
        <CustomizedText>
          TODO LIST
          <FontAwesomeIcon icon={faCoffee} style={{ fontSize: '3rem' }} />
        </CustomizedText>

        <Tabs>
          <TabList>
            <Tab>
              <h3>
                <FontAwesomeIcon icon={faHome} /> Home
              </h3>
            </Tab>
            <Tab>
              <h3>
                <FontAwesomeIcon icon={faPlus} /> addTask
              </h3>
            </Tab>
          </TabList>
          <TabPanel>
            <TodoList deleteTaskHandler={this.deleteTaskHandler} todos={this.state.todos} />
          </TabPanel>
          <TabPanel>
            <AddTask addTaskHandler={this.addTaskHandler} todos={this.state.todos} />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

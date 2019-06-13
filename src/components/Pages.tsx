import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TodoList from './Table';
import AddTask from './AddTask';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Route, Switch } from 'react-router';
import console = require('console');

interface State {
  tabPath: string;
}
interface Props {
  deleteTaskHandler: (id: string) => void;
  addTaskHandler: (value: string) => void;
  todos: Todo[];
  _props: any;
}
const tabs: string[] = ['/', '/addTask'];
export default class Page extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      tabPath: this.props._props.history.location.pathname,
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(index: number) {
    console.log(index);
    this.setState({ tabPath: tabs[index] });
    console.log(this.props._props.history);
    this.props._props.history.push(tabs[index]);
  }
  getIndex = () => {
    return tabs.indexOf(this.state.tabPath);
  };

  render() {
    return (
      <Tabs onSelect={this.handleSelect} selectedIndex={this.getIndex()}>
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
          <Route
            exact={true}
            path="/"
            render={() => <TodoList deleteTaskHandler={this.props.deleteTaskHandler} todos={this.props.todos} />}
          />
        </TabPanel>
        <TabPanel onSelect={() => console.log(this.props._props.history)}>
          <Route
            exact={true}
            path="/addTask"
            render={() => <AddTask addTaskHandler={this.props.addTaskHandler} todos={this.props.todos} />}
          />
        </TabPanel>
      </Tabs>
    );
  }
}

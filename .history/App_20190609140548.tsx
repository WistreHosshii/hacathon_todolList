import React, { Component } from 'react';

interface Props {}
interface State {
  todos: Todo[];
}

export default class App extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = { todos: [] };
  }

  render() {
    return (
      <div>
        <div className="todoList">
          <div className="title">TODO LIST</div>
          <div className="contents">
            <div className="tasks">
              {this.state.todos.forEach(element => {
                element.content;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

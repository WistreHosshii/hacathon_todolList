import React, { Component } from 'react';

interface Props {}
interface State {
  todos: Todo[];
}

export default class App extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = { todos: [{ id: '', content: 'aaa', createdAt: '' }, { content: 'bbb' }] };
  }

  render() {
    return (
      <div>
        <div className="todoList">
          <div className="title">TODO LIST</div>
          <div className="contents">
            <div className="tasks">
              {this.state.todos.map(task => {
                return task.content;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

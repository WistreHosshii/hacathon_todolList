import React, { Component } from 'react';

interface Props {}
interface State {
  todos: Todo[];
}

export default class App extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = { todos: [{ id: '', content: 'aaa', createdAt: '' }, { id: '', content: 'bbb', createdAt: '' }] };
  }

  render() {
    return (
      <div>
        <div className="todoList">
          <div className="title">TODO LIST</div>
          <div className="contents">
            <table>
              <tr>
                {this.state.todos.map(task => {
                  return task.content;
                })}
              </tr>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

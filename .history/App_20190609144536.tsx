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

  let jobCount = this.state.todos.length

  render() {
    return (
      <div>
        <div className="todoList">
          <div className="title">TODO LIST</div>
          <div className="contents">
            <table>
              <tr>
                <th>完了</th>
                <th>未完了</th>
              </tr>
              <tr>
                <td>aaa</td>
                <td>a</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

import React, { Component } from 'react';

interface Props {}
interface State {
  todos: Todo[];
}

export default class App extends Component<Props>,<State></State> {
  render() {
    return (
      <div>
        <div className="title">TODO LIST</div>
      </div>
    );
  }
}

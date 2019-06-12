import React, { Component } from 'react';
// import PageButton from './Button';
// import { Pages } from '../App';
// import { Link } from 'react-router-dom';

interface Props {
  addTaskHandler: (value: string) => void;
  todos: Todo[];
  //value: string;
  //changePage: (page: Pages) => void;
}
interface State {
  value: string;
}

export default class AddTask extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: '' };
  }
  handleChange(event: any) {
    this.setState({ value: event.target.value });
  }
  render() {
    return (
      <div>
        {/* <Link to="/">
          <PageButton changePage={this.props.changePage} page="List" />
        </Link> */}
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <button
          onClick={() => {
            this.props.addTaskHandler(this.state.value);
            this.setState({ value: '' });
          }}
        >
          add Task!
        </button>
      </div>
    );
  }
}

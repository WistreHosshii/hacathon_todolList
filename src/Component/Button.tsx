import React, { Component } from 'react';
import { Pages } from '../App';

interface Prop {
  changePage: (page: Pages) => void;
  page: Pages;
}

export default class Button extends Component<Prop> {
  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.props.changePage(this.props.page);
          }}
        >
          {this.props.page}
        </button>
      </div>
    );
  }
}

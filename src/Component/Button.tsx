import React, { Component } from 'react';
//import { Pages } from '../App';

// interface Props {
//   changePage: (page: Pages) => void;
//   page: Pages;
// }

export default class Button extends Component /*<Props> */ {
  render() {
    return (
      <div>
        <button
        // onClick={() => {
        //   this.props.changePage(this.props.page);
        // }}
        >
          {/* {this.props.page} */}
        </button>
      </div>
    );
  }
}

import React, { Component } from 'react';

export default class Cell extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <td
        className={"td-body"}
      >
        {this.props.content}
      </td>
    );
  }
}

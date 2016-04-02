import React, { Component } from 'react'

export default class Cell extends Component {
  constructor() {
    super()
  }

  onMouseDown() {
    this.props.handleMouseDown(this.props.day, this.props.time)
  }

  onMouseEnter() {
    this.props.handleMouseEnter(this.props.day, this.props.time)
  }

  onMouseUp() {
    this.props.handleMouseUp(this.props.day, this.props.time)
  }

  render() {
    return (
      <td
        className={this.props.className}
        // onMouseDown={this.onMouseDown.bind(this)}
        // onMouseEnter={this.onMouseEnter.bind(this)}
        // onMouseUp={this.onMouseUp.bind(this)}
      >
        {this.props.content}
      </td>
    )
  }
}

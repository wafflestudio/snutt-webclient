import React, { Component } from 'react'

export default class TimetableSelector extends Component {
  constructor() {
    super()
    this.onDelete = this.onDelete.bind(this)
  }

  onDelete(i, e) {
    this.props.handleDelete(i)
    e.stopPropagation()
  }

  render() {
    var buttons = []
    for (var i = 0; i < this.props.total; i++) {
      buttons.push(
        <button
          type="button"
          className={"btn btn-default" + (i == this.props.currentIndex ? " btn-primary" : "")}
          key={i}
          onClick={this.props.handleChange.bind(this, i)}
        >
          {i + 1}
          <span className="glyphicon glyphicon-remove" aria-hidden="true" onClick={this.onDelete.bind(this, i)}/>
        </button>
      )
    }
    buttons.push(
      <a
        type="button"
        className="btn btn-default"
        aria-label="Left Align"
        onClick={() => this.props.handleAdd()}
        key={-1}
      >
        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
      </a>
    )
    return (
      <div className="btn-group" role="group" aria-label="...">
        {buttons}
      </div>
    )
  }
}

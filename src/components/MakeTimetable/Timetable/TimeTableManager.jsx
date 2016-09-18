import React, { Component } from 'react'

export default class TimetableSelector extends Component {
  constructor() {
    super()
    this.onDelete = this.onDelete.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  onDelete(i, e) {
    this.props.handleDelete(i)
    e.stopPropagation()
  }

  handleSave(e) {
    console.log("Coming soon")
  }

  render() {
    var buttons = []
    for (var i = 0; i < this.props.total; i++) {
      buttons.push(
        <li
          className={'tab-button' + (i == this.props.currentIndex ? ' active' : '')}
          key={i}
          onClick={this.props.handleChange.bind(this, i)}
        >
          {i+1}
          <span
            className="glyphicon glyphicon-remove"
            aria-hidden="true"
            onClick={this.onDelete.bind(this, i)}
          />
        </li>
      )
    }
    //add button
    buttons.push(
      <li
        className="tab-button control"
        key={++i}
        onClick={this.props.handleAdd}
      >
        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
      </li>
    )
    //save button
    buttons.push(
      <li
        className="tab-button control"
        key={++i}
        onClick={this.handleSave}
      >
        <span className="glyphicon glyphicon-save" aria-hidden="true"></span>
      </li>
    )
    return(
      <ul className="tab-list">
        {buttons}
      </ul>
    )
  }
}

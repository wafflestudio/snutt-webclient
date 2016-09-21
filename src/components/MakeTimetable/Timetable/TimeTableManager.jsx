import React, { Component } from 'react'
import InlineEdit from 'react-edit-inline'

export default class TimetableSelector extends Component {
  constructor() {
    super()
    this.onDelete = this.onDelete.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleTitleUpdate = this.handleTitleUpdate.bind(this)
  }

  onDelete(i, e) {
    this.props.handleDelete(i)
    e.stopPropagation()
  }

  handleAdd(e) {
    e.preventDefault()
    const newTitle = prompt("새 시간표의 제목을 입력해 주세요")
    console.log(newTitle)
    if (newTitle)
      this.props.handleAdd(newTitle)
  }

  handleSave(e) {
    console.log("Coming soon")
  }

  handleTitleUpdate(e) {
    e.preventDefault()
    const input = prompt("새 제목을 입력해 주세요")
    if (input)
      this.props.handleTitleUpdate(input)
  }

  render() {
    let buttons = this.props.titles.map((title, i) =>
      <li
        className={'tab-button' + (i == this.props.currentIndex ? ' active' : '')}
        key={i}
        onClick={this.props.handleChange.bind(this, i)}
      >
        <span
          onClick={this.handleTitleUpdate}
          className='table-title'
        >
          <nobr>{title}</nobr>
        </span>
        <span
          className="glyphicon glyphicon-remove"
          aria-hidden="true"
          onClick={this.onDelete.bind(this, i)}
        />
      </li>
    )
    //add button
    buttons.push(
      <li
        className="tab-button control"
        key={-1}
        onClick={this.handleAdd}
      >
        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
      </li>
    )
    //save button
    buttons.push(
      <li
        className="tab-button control"
        key={-2}
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

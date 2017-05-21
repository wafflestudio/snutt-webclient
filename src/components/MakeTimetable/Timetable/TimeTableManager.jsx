import React, { Component } from 'react';

export default class TimetableSelector extends Component {
  constructor() {
    super();
    this.onDelete = this.onDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleTitleUpdate = this.handleTitleUpdate.bind(this);
  }

  onDelete(id, e) {
    this.props.handleDelete(id);
    e.stopPropagation();
  }

  handleAdd(e) {
    e.stopPropagation();
    const newTitle = prompt('새 시간표의 제목을 입력해 주세요');
    console.log(newTitle);
    if (newTitle) { this.props.handleAdd(newTitle); }
  }

  handleSave(e) {
    alert('그림 파일로 저장하는 기능은 제작중입니다');
  }

  handleTitleUpdate(e) {
    e.stopPropagation();
    const input = prompt('새 제목을 입력해 주세요');
    if (input) { this.props.handleTitleUpdate(input); }
  }

  render() {
    const { currentId, tables } = this.props;
    const buttons = tables.map((table, i) => {
      const isActive = table._id == this.props.currentId;
      return (
        <li
          className={`tab-button${isActive ? ' active' : ''}`}
          key={i}
          onClick={this.props.handleChange.bind(this, table._id)}
        >
          <span
            onClick={isActive ? this.handleTitleUpdate : null}
            className="table-title"
          >
            <nobr>{table.title}</nobr>
          </span>
          <span
            className="glyphicon glyphicon-remove"
            aria-hidden="true"
            onClick={this.onDelete.bind(this, table._id)}
          />
        </li>
      );
    });
    // add button
    buttons.push(
      <li
        className="tab-button control"
        key={-1}
        onClick={this.handleAdd}
      >
        <span className="glyphicon glyphicon-plus" aria-hidden="true" />
      </li>,
    );
    // save button
    buttons.push(
      <li
        className="tab-button control"
        key={-2}
        onClick={this.handleSave}
      >
        <span className="glyphicon glyphicon-save" aria-hidden="true" />
      </li>,
    );
    return (
      <ul className="tab-list">
        {buttons}
      </ul>
    );
  }
}

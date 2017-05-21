import React, { Component } from 'react';
import { connect } from 'react-redux';
import { switchTable, createTable, deleteTable, updateTitle } from '../../../actions/tableActions';

function mapStateToProps(state) {
  const { currentId, tableIndex: tables } = state.tableList;
  return { currentId, tables };
}

const mapDispatchToProps = dispatch => ({
  onOpenTable: id => dispatch(switchTable(id)),
  onCreateTable: title => dispatch(createTable(title)),
  onDeleteTable: id => dispatch(deleteTable(id)),
  onUpdateTitle: title => dispatch(updateTitle(title)),
});

class TimetableTabs extends Component {
  constructor() {
    super();
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleTitleUpdate = this.handleTitleUpdate.bind(this);
  }

  handleAdd(e) {
    e.stopPropagation();
    const newTitle = prompt('새 시간표의 제목을 입력해 주세요');
    if (newTitle) {
      this.props.onCreateTable(newTitle);
    }
  }

  handleDelete(id, e) {
    e.stopPropagation();
    this.props.onDeleteTable(id);
  }

  handleSelect(id, e) {
    e.stopPropagation();
    console.log('HandleSelect', id);
    this.props.onOpenTable(id);
  }

  handleSave(e) {
    alert('그림 파일로 저장하는 기능은 제작중입니다');
  }

  handleTitleUpdate(e) {
    e.stopPropagation();
    const input = prompt('새 제목을 입력해 주세요');
    if (input) {
      this.props.onUpdateTableTitle(input);
    }
  }

  renderTab(table, isActive) {
    const { _id: id } = table;
    return (
      <li
        className={`tab-button${isActive ? ' active' : ''}`}
        key={id}
        onClick={this.handleSelect.bind(this, id)}
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
          onClick={this.handleDelete.bind(this, id)}
        />
      </li>
    );
  }

  render() {
    const { currentId, tables } = this.props;
    const buttons = tables.map(table => this.renderTab(table, table._id === currentId));
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

export default connect(mapStateToProps, mapDispatchToProps)(TimetableTabs);

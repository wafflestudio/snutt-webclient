import React, { Component } from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
require('react-bootstrap-table/css/react-bootstrap-table-all.css')

export default class Search extends Component {
  constructor() {
    super()
    this.handleSelect = this.handleSelect.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }

  handleSelect(row, isSelected) {
    if (isSelected) {
      this.props.onSelect(row)
    } else {
      this.props.onSelect(null)
    }
  }

  handleAdd(e) {
    console.log('plus')
  }

  render() {
    var selectOption = {
      mode: 'radio',
      clickToSelect: true,
      bgColor: '#dfdfdf',
      className: 'selected',
      hideSelectColumn: true,
      onSelect: this.handleSelect
    }
    var opt = {
      noDataText: "해당하는 강좌가 없습니다"
    }
    return (<BootstrapTable
      keyField="_id"
      data={this.props.results}
      height="200"
      selectRow={selectOption}
      hover={true}
      options={opt}>
        <TableHeaderColumn dataField='course_number' width="100">과목번호</TableHeaderColumn>
        <TableHeaderColumn dataField='lecture_number' width="80">강좌번호</TableHeaderColumn>
        <TableHeaderColumn
          dataField='course_title'
          width="200">
          과목이름
        </TableHeaderColumn>
        <TableHeaderColumn dataField='department' width='150'>학과</TableHeaderColumn>
        <TableHeaderColumn dataField='class_time' width='150'>시간</TableHeaderColumn>
        <TableHeaderColumn dataField='remark'>비고</TableHeaderColumn>
      </BootstrapTable>);
  }
}

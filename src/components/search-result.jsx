import React, { Component } from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import sampleResult from '../actions/sampleResult'
require('react-bootstrap-table/css/react-bootstrap-table-all.css')

export default class Search extends Component {
  constructor() {
    super()
  }

  render() {
    return (<BootstrapTable data={sampleResult} height="200">
        <TableHeaderColumn dataField='course_number' isKey='true' height="200">과목번호</TableHeaderColumn>
        <TableHeaderColumn dataField='course_title'>과목이름</TableHeaderColumn>
      </BootstrapTable>);
  }
}

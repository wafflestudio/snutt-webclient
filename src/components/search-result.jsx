import React, { Component } from 'react'
import {Table, Column, Cell} from 'fixed-data-table'
import sampleResult from '../actions/sampleResult'

export default class Search extends Component {
  constructor() {
    super()
    this.state = { result: sampleResult }
  }

  render() {
    return (<Table
      rowHeight={15}
      rowsCount={10}
      width={1000}
      height={300}
      headerHeight={15}>
      <Column
        header={<Cell>Col 1</Cell>}
        cell={<Cell>Column1 static content</Cell>}
        width={100}/>
    </Table>);
  }
}

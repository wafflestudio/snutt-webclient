import React, { Component } from 'react'
import update from'react-addons-update'
import PureRenderComponent from '../../PureRenderComponent.jsx'

const TableState = {
  SELECTING: 'SELECTING',
  DELETING: 'DELETING',
  CALM: 'CALM',
}

const CellState = {
  EMPTY: 'EMPTY',
  SELECTED: 'SELECTED',
}

class DraggableCell extends PureRenderComponent {
  constructor() {
    super()
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  onMouseDown(e) {
    e.stopPropagation()
    this.props.handleMouseDown(this.props.row, this.props.col)
  }

  onMouseUp(e) {
    e.stopPropagation()
    this.props.handleMouseUp(this.props.row, this.props.col)
  }

  onMouseEnter(e) {
    e.stopPropagation()
    this.props.handleMouseEnter(this.props.row, this.props.col)
  }

  onClick(e) {
    e.stopPropagation()
  }

  render() {
    let className = this.props.status
    if (this.props.dragged)
      className = this.props.tableState
    return (
      <td
        key={this.props.col}
        className={'draggable ' + className}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onMouseEnter={this.onMouseEnter}
        onClick={this.onClick}
      >
      </td>
    )
  }
}
DraggableCell.propTypes = {
  status: React.PropTypes.oneOf(Object.keys(CellState)).isRequired,
  row: React.PropTypes.number.isRequired,
  col: React.PropTypes.number.isRequired,
}

/**
 * Helper functions for table state
 */
function update2dArr(arr, cell1, cell2, value) {
  const {tl, dr} = getRange(cell1, cell2)
  let newArr = arr
  for (let r = tl.row; r <= dr.row; r++)
    for (let c = tl.col; c <= dr.col; c++)
      newArr = update(newArr, {[r]: {[c]: {$set: value}}})
  return newArr
}

function getRange(init, end) {
  const tl = { row: Math.min(init.row, end.row), col: Math.min(init.col, end.col) }
  const dr = { row: Math.max(init.row, end.row), col: Math.max(init.col, end.col) }
  return { tl, dr }
}

function isInRange(r, c, tl, dr) {
  return tl.row <= r && r <= dr.row && tl.col <= c && c <= dr.col
}

export default class CellSelector extends Component {
  constructor(props) {
    super(props)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.renderHeader = this.renderHeader.bind(this)
    this.renderBody = this.renderBody.bind(this)
    this.state = {
      tableState: TableState.CALM,
      dragInit: {row: -1, col: -1},
      dragEnd: {row: -1, col: -1},
    }
  }

  handleMouseDown(r, c) {
    const prevCellState = this.props.cells[r][c]
    const nextTableState = prevCellState === CellState.EMPTY ?
                            TableState.SELECTING : TableState.DELETING
    const here = {row: r, col: c}
    this.setState({
      dragInit: here,
      dragEnd: here,
      tableState: nextTableState,
    })
  }

  handleMouseEnter(_r, _c) {
    const {tableState} = this.state
    if (tableState === TableState.CALM) return;

    const here = {row: _r, col: _c}
    this.setState({dragEnd: here})
  }

  handleMouseUp(_r, _c) {
    const {tableState, dragInit} = this.state
    if (tableState === TableState.CALM) return;

    const here = {row: _r, col: _c}
    let newCellState = (tableState === TableState.SELECTING ? CellState.SELECTED : CellState.EMPTY)

    this.props.handleUpdate(update2dArr(this.props.cells, dragInit, here, newCellState))
    this.setState({
      dragInit: {row: -1, col: -1},
      dragEnd: {row: -1, col: -1},
      tableState: TableState.CALM,
    })
  }

  renderHeader() {
    const labels = this.props.colLabels.map((label, index) =>
      <th key={index}>{label}</th>)
    return <tr>{[<th key={-1}></th>].concat(labels)}</tr>
  }

  renderBody() {
    const labels = this.props.rowLabels.map((label, index) =>
      <td key={index}>{label}</td>)
    const cellStateTable = this.props.cells
    const {tl, dr} = getRange(this.state.dragInit, this.state.dragEnd)
    return cellStateTable.map((row, rowIndex) => {
      const cols = row.map((col, colIndex) =>
        <DraggableCell
          row={rowIndex}
          col={colIndex}
          handleMouseDown={this.handleMouseDown}
          handleMouseEnter={this.handleMouseEnter}
          handleMouseUp={this.handleMouseUp}
          status={cellStateTable[rowIndex][colIndex]}
          tableState={this.state.tableState}
          dragged={isInRange(rowIndex, colIndex, tl, dr)}
        />
      )
      return (
        <tr key={rowIndex}>
          {[labels[rowIndex]].concat(cols)}
        </tr>
      )
    })
  }

  render() {
    return(
      <table className='cell-selector'>
        <thead>{this.renderHeader()}</thead>
        <tbody>{this.renderBody()}</tbody>
      </table>
    )
  }
}
CellSelector.propTypes = {
  row: React.PropTypes.number.isRequired,
  col: React.PropTypes.number.isRequired,
  rowLabels: React.PropTypes.arrayOf(React.PropTypes.string),
  colLabels: React.PropTypes.arrayOf(React.PropTypes.string),
}

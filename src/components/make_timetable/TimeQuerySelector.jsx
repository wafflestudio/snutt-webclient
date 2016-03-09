import React, { Component } from 'react'
import update from 'react-addons-update'

function update2dArr(arr, row, col, newElement) {
  return update(arr, {[row]: {[col]: {$set: newElement}}})
}

class DraggableCell extends Component {
  constructor() {
    super()
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.onMouseEnter = this.onMouseEnter.bind(this)
  }

  onMouseDown() {
    this.props.handleMouseDown(this.props.row, this.props.col)
  }

  onMouseUp() {
    this.props.handleMouseUp(this.props.row, this.props.col)
  }

  onMouseEnter() {
    this.props.handleMouseEnter(this.props.row, this.props.col)
  }

  render() {
    if (this.props.status == 1)
      var className = 'selected'
    else if (this.props.status == 0)
      var className = 'dragged'
    return (
      <td
        className={className}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onMouseEnter={this.onMouseEnter}
      />
    )
  }
}

export default class TimeQuerySelector extends Component {
  constructor() {
    super()
    this.rows = 26
    this.cols = 6
    this.emptyArray = this.emptyArray.bind(this)
    this.drawTableBody = this.drawTableBody.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.getRange = this.getRange.bind(this)
    this.draggedRange = { tl: { r: -1, c: -1 }, dr: { r: -1, c: -1 } }
    this.state = {
      isDragging: false,
      dragInit: { r: -1, c: -1 },
      dragEnd: { r: -1, c: -1 },
      // null: nothing, 0: dragged, 1: selected
      stateTable: this.emptyArray(),
      isDeleting: false
    }
  }

  emptyArray() {
    var empty = new Array(this.cols)
    for (var d = 0; d < this.cols; d++)
      empty[d] = new Array(this.rows)
    return empty
  }

  getRange(init, end) {
    var tl = {
      r: Math.min(init.r, end.r),
      c: Math.min(init.c, end.c)
    }
    var dr = {
      r: Math.max(init.r, end.r),
      c: Math.max(init.c, end.c)
    }
    return { tl, dr }
  }

  handleMouseDown(r, c) {
    this.setState({
      isDragging: true,
      dragInit: { r, c },
      dragEnd: { r, c },
      stateTable: update2dArr(this.state.stateTable, c, r, 0),
      isDeleting: this.state.stateTable[c][r] == 1
    })
  }

  handleMouseUp(r, c) {
    // update dragged cell's state
    // issue: N update vs 1 clone ??
    var newStateTable = this.state.stateTable
    for (var i = 0; i < this.cols; i++) {
      for (var j = 0; j < this.rows; j++) {
        if (newStateTable[i][j] == 0)
          newStateTable = update2dArr(newStateTable, i, j, this.state.isDeleting ? null: 1)
      }
    }

    this.setState({
      isDragging: false,
      dragInit: { r: -1, c: -1 },
      dragEnd: { r: -1, c: -1 },
      stateTable: newStateTable,
      isDeleting: false
    })
  }

  handleMouseEnter(r, c) {
    if (this.state.isDragging) {
      var {tl, dr} = this.getRange(this.state.dragInit, { r, c } )
      var newStateTable = this.state.stateTable
      for (var i = 0; i < this.cols; i++) {
        for (var j = 0; j < this.rows; j++) {
          if (tl.r <= j && j <= dr.r && tl.c <= i && i <= dr.c)
            newStateTable = update2dArr(newStateTable, i, j, 0)
          else if (newStateTable[i][j] == 1)
            continue;
          else
            newStateTable = update2dArr(newStateTable, i, j, null)
        }
      }
      this.setState({
        dragEnd: { r, c },
        stateTable: newStateTable
      })
    }
  }

  drawTableBody() {
    var rows = [];
    for (var r = 0; r < this.rows; r++) {
      var row = []
      row.push(<td key={-1} />)
      for (var c = 0; c < this.cols; c++) {
        row.push(
          <DraggableCell
            status={this.state.stateTable[c][r]}
            key={c}
            row={r}
            col={c}
            handleMouseDown={this.handleMouseDown}
            handleMouseUp={this.handleMouseUp}
            handleMouseEnter={this.handleMouseEnter}
          />
        )
      }
      rows.push(<tr key={r}>{row}</tr>)
    }
    return (<tbody>{rows}</tbody>)
  }

  render() {
    this.draggedRange = this.getRange(this.state.dragInit, this.state.dragEnd)
    return (
      <div id='timeselector-container'>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th></th>
              <th>월</th>
              <th>화</th>
              <th>수</th>
              <th>목</th>
              <th>금</th>
              <th>토</th>
            </tr>
          </thead>
          {this.drawTableBody()}
        </table>
        <button
          className='btn btn-default'
        >
        OK
        </button>
      </div>
    )
  }
}
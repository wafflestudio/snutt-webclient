import React, { Component } from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'

import { updateQuery, toggleTimeselect } from '../../../actions'
import CellSelector from './CellSelector.jsx'

/**
* Converts 6 32bit masks to 30 x 6 2d array.
* 1 -> 'SELECTED',
* 0 -> 'EMPTY'
*/
function maskToCells(masks) {
  //Immutable.List() -> JS array
  let plainMasks = masks.toJS()
  let cells = new Array(30).fill().map(() =>new Array(6).fill('EMPTY'))
  for (let d = 0; d < 6; d++) {
    for (let t = 29; t >= 0; t--) {
      let bit = plainMasks[d] & 1
      if (bit === 1) {
        cells[t][d] = 'SELECTED'
      }
      plainMasks[d] >>= 1
    }
  }
  return cells
}

/**
 * Converts 30 x 6 2d array into 6 integer
 */
function cellsToMask(arr) {
  let masks = [0, 0, 0, 0, 0, 0]

  for (let t = 0; t < 30; t++) {
    for (let d = 0; d < 6; d++) {
      let bit = arr[t][d] === 'SELECTED' ? 1 : 0
      masks[d] |= bit
      if (t != 29) masks[d] <<= 1
    }
  }
  return Immutable.List(masks)
}


class TimeQuery extends Component {
  constructor(props) {
    super(props)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.state = { cells: maskToCells(props.masks) }
  }

  handleSave(e) {
    e.stopPropagation()
    const { dispatch } = this.props
    const newMasks = cellsToMask(this.state.cells)
    dispatch(updateQuery('time_mask', () => newMasks))
    dispatch(toggleTimeselect())
  }

  handleCancel(e) {
    e.stopPropagation()
    const { dispatch } = this.props
    dispatch(toggleTimeselect())
  }

  handleUpdate(newCells) {
    this.setState({ cells: newCells })
  }

  render() {
    return (
      <div className='time-query'>
        <span><strong>검색하고 싶은 시간대들을 드래그하세요</strong></span>
        <div className='btns'>
          <div
            className='btn btn-primary btn-sm'
            onClick={this.handleSave}
          >
            확인
          </div>
          <div
            className='btn btn-default btn-sm'
            onClick={this.handleCancel}
          >
            취소
          </div>
        </div>
        <CellSelector
          row={30}
          col={6}
          rowLabels={new Array(30).fill().map((val, idx) =>
            idx % 2 === 0 ? String(idx / 2 + 8) : ' '
          )}
          colLabels={['월', '화', '수', '목', '금', '토']}
          cells = {this.state.cells}
          handleUpdate = {this.handleUpdate}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { masks : state.query.get('time_mask') }
}

export default connect(mapStateToProps)(TimeQuery)

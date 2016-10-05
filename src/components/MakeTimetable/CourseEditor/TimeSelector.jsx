import React, { Component } from 'react'
import Modal from 'react-modal'
import { maskToCells, cellsToMask } from '../Search/TimeQuery.jsx'
import CellSelector from '../Search/CellSelector.jsx'

export default class TimeSelector extends Component {
  constructor(props) {
    super(props)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.state = { cells: maskToCells(props.masks) }
  }

  handleSave(e) {
    e.stopPropagation()
    this.props.handleSave(cellsToMask(this.state.cells))
  }

  handleCancel(e) {
    e.stopPropagation()
    this.props.handleCancel(e)
  }

  handleUpdate(newCells) {
    this.setState({ cells: newCells })
  }

  render() {
    return (
      <Modal
        isOpen={true}
        className='snutt__modal'
        overlayClassName='snutt__modal-overlay'
      >
        <div className='time-query'>
          <span><strong>원하는 시간대를 드래그하세요</strong></span>
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
      </Modal>
    )
  }
}

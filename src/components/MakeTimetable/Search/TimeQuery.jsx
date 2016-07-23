import React, { Component } from 'react'

import CellSelector from './CellSelector.jsx'

export default class TimeQuery extends Component {
  render() {
    return (
      <div className='time-query'>
        <span><strong>검색하고 싶은 시간대들을 드래그하세요</strong></span>
        <div className='btns'>
          <button className='btn btn-primary btn-sm'>확인</button>
          <button className='btn btn-default btn-sm'>취소</button>
        </div>
        <CellSelector
          row={28}
          col={6}
          rowLabels={new Array(28).fill().map((val, idx) =>
            idx % 2 === 0 ? idx + 8 : ' '
          )}
          colLabels={['월', '화', '수', '목', '금', '토']}
        />
      </div>
    )
  }
}

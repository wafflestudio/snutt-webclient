import React, { Component } from 'react'

import CellSelector from './CellSelector.jsx'

export default class TimeQuery extends Component {
  render() {
    return (
      <div style={style}>
        <span>검색하고 싶은 시간대들을 드래그하세요</span>
        <CellSelector
          row={28}
          col={6}
          rowLabels={new Array(28).fill().map((val, idx) => String(idx))}
          colLabels={['월', '화', '수', '목', '금', '토']}
        />
      </div>
    )
  }
}

const style = {
  backgroundColor: 'white',
  width: '600px',
  padding: '15px',
  margin: 'auto',
  marginTop: '20px',
}

import React from 'react'
import PureRenderComponent from '../../PureRenderComponent.jsx'
import update from 'react-addons-update'

const daysKorean = ['월', '화', '수', '목', '금', '토', '일']
const times = [...Array(29).keys()].map(v => v / 2) // 0, 0.5, 1 .... 14.5
const hhmms = times.map(gyosi => {
  const hh = Math.floor(gyosi) + 8
  const mm = (gyosi % 1) === 0.5 ? '30' : '00'
  return `${hh}:${mm}`
})

class ClassTimeRow extends PureRenderComponent {
  constructor(props) {
    super(props)
    this.updateDay = this.updateDay.bind(this)
    this.updateStart = this.updateStart.bind(this)
    this.updateLen = this.updateLen.bind(this)
    this.updatePlace = this.updatePlace.bind(this)
    this.deleteThisRow = this.deleteThisRow.bind(this)
  }

  // Anyone who knows how to skip functions below without binding in render(),
  // please tell me via comment ㅜㅜ
  updateDay = e => this.props.updateRow(this.props.index, 'day', e.target.value)
  updateStart = e => this.props.updateRow(this.props.index, 'start', e.target.value)
  updateLen = e => this.props.updateRow(this.props.index, 'len', e.target.value)
  updatePlace = e => this.props.updateRow(this.props.index, 'place', e.target.value)
  deleteThisRow = e => { e.preventDefault; this.props.deleteRow(this.props.index) }

  render() {
    const { day, start, len, place, updateRow } = this.props
    const dayKorean = daysKorean[day]

    return (
      <div className='snutt__json_row'>
        <select className='day' value={day} onChange={this.updateDay}>
          <option value='-1' disabled>요일</option>
          {daysKorean.map((day, index) =>
            <option key={index} value={index}>{day}</option>
          )}
        </select>
        <select className='start' value={start} onChange={this.updateStart}>
          <option value='-1' disabled>시작</option>
          {hhmms.map((hhmm, index) =>
            <option key={index} value={index/2}>{hhmm}</option>
          )}
        </select>
        <select className='len' value={len} onChange={this.updateLen}>
          <option value='-1' disabled>마침</option>
          {[...Array(10).keys()].map((val, index) =>
            <option key={index} value={index / 2}>{index/2}</option>
          )}
        </select>
        <input className='place' value={place} onChange={this.updatePlace} type='text' placeholder='(장소)'/>
        <span className="glyphicon glyphicon-remove" onClick={this.deleteThisRow}></span>
      </div>
    )
  }
}

class JsonEditor extends PureRenderComponent {
  constructor(props) {
    super(props)
    this.addRow = this.addRow.bind(this)
    this.deleteRow = this.deleteRow.bind(this)
    this.updateRow = this.updateRow.bind(this)
  }

  addRow(e) {
    e.preventDefault()
    const { class_time_json, updateJson } = this.props
    const newRow = { day: -1, start: -1, len: -1, place: '장소' }
    const addedJson = update(class_time_json, {$push: [newRow]})
    updateJson(addedJson)
  }

  deleteRow(index) {
    const { class_time_json, updateJson } = this.props
    const deletedJson = update(class_time_json, {$splice: [[index, 1]]})
    updateJson(deletedJson)
  }

  updateRow(index, field, value) {
    const { class_time_json, updateJson } = this.props
    const updatedJson = update(class_time_json, { [index]: { [field]: { $set: value }}})
    updateJson(updatedJson)
  }

  render() {
    return (
      <div className='snutt__json_container'>
        {this.props.class_time_json.map((row, i) =>
          <ClassTimeRow
            index={i}
            key={i}
            {...row}
            updateRow={this.updateRow}
            deleteRow={this.deleteRow}
          />
        )}
        <button id="add-row" className='btn btn-default' onClick={this.addRow}>시간 추가</button>
      </div>
    )
  }
}

JsonEditor.propTypes = {
  updateJson: React.PropTypes.func.isRequired,
  class_time_json: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
}

export default JsonEditor

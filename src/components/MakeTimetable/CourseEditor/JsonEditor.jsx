import React from 'react'
import PureRenderComponent from '../../PureRenderComponent.jsx'
import update from 'react-addons-update'

import Select from 'react-select';

import ArrowUp from '../../../../assets/ic-arrow-up-normal.svg'
import ArrowDown from '../../../../assets/ic-arrow-down-normal.svg'

const daysKorean = ['월', '화', '수', '목', '금', '토', '일'].map(name =>
  ({ value: name, label: name, className: 'snutt__options' })
)
const times = [...Array(29).keys()].map(v => v / 2) // 0, 0.5, 1 .... 14.5
const hhmms = times.map(gyosi => {
  const hh = Math.floor(gyosi) + 8
  const mm = (gyosi % 1) === 0.5 ? '30' : '00'
  return `${hh}:${mm}`
}).map((hhmm, index) => ({ value: index / 2, label: hhmm, className: 'snutt__options' }))

const lectureLengths = [...Array(10).keys()].map((len, index) =>
  ({ value: index / 2, label: len, className: 'snutt__options' })
)

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
  // updateDay = e => this.props.updateRow(this.props.index, 'day', e.target.value)
  updateDay = v => this.props.updateRow(this.props.index, 'day', v)
  updateStart = v => this.props.updateRow(this.props.index, 'start', v)
  updateLen = v => this.props.updateRow(this.props.index, 'len', v)
  updatePlace = e => this.props.updateRow(this.props.index, 'place', e.target.value)
  deleteThisRow = e => { e.preventDefault; this.props.deleteRow(this.props.index) }

  arrowRenderer = ({onMouseDown, isOpen}) => (isOpen ? <ArrowUp /> : <ArrowDown />)

  render() {
    const { day, start, len, place, updateRow } = this.props
    const dayKorean = daysKorean[day]

    return (
      <div className='snutt__json_row'>
        <Select
          className="snutt__select"
          name="day-selector"
          value={day}
          options={daysKorean}
          onChange={this.updateDay}
          searchable={false}
          clearable={false}
          placeholder="요일"
          arrowRenderer={this.arrowRenderer}
        />
        <Select
          className="snutt__select"
          name="start-selector"
          value={start}
          options={hhmms}
          onChange={this.updateStart}
          searchable={false}
          clearable={false}
          placeholder="시작"
          arrowRenderer={this.arrowRenderer}
        />
        <Select
          className="snutt__select"
          name="length-selector"
          value={len}
          options={lectureLengths}
          onChange={this.updateLen}
          searchable={false}
          clearable={false}
          placeholder="길이"
          arrowRenderer={this.arrowRenderer}
        />
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
    const newRow = { day: undefined, start: undefined, len: undefined, place: '장소' }
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

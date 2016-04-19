import React, { Component } from 'react'

function selectedCellToJson(cellStatus) {
  var times = []
  var start = -1, end
  for (let d = 0; d < 6; d++) {
    for (let t = 0; t < 26; t++) {
      var current = cellStatus[d][t]
      var next = cellStatus[d][t+1]
      if (current == 'SELECTED') {
        if (start == -1)
          start = t
        if (next !== 'SELECTED') {
          times.push({ day: d, start, len: (t - start + 1), place: ''})
          start = -1;
        }
      }
    }
  }
  return times
}

function timeJsonToMask(timeJson) {
  var i,j;
  var bitTable2D = [];
  for (let i = 0; i < 6; i++) {
    bitTable2D[i] = []
    for (let j = 0; j < 26; j++)
      bitTable2D[i].push(0)
  }

  timeJson.forEach(function(lecture, lectureIdx) {
    var dayIdx = lecture.day;
    for (var i = lecture.start * 2; i < (lecture.start + lecture.len)*2; i++)
      bitTable2D[dayIdx][i] = 1
  });

  var timeMasks = [];
  for (i = 0; i < 6; i++) {
    var mask = 0;
    for (j = 0; j < 25; j++) {
      if (bitTable2D[i][j] === 1)
        mask = mask + 1;
      mask = mask << 1
    }
    timeMasks.push(mask)
  }
  return timeMasks
}

export default class NewCourseForm extends Component {
  constructor() {
    super()
    this.state = { title: '', place: '', memo: '' }
    this.handleClick = this.handleClick.bind(this)
    this.formGroup = this.formGroup.bind(this)
  }

  handleClick(e) {
    e.preventDefault()
    if (this.state.title == '') {
      alert('과목명은 필수입니다')
      return;
    }
    var selectedTime = selectedCellToJson(this.props.cellStatus)
    this.props.addCourse({
      year: this.props.currentCourseBook.year,
      semester: this.props.currentCourseBook.semesterIdx,
      course_title: this.state.title,
      credit: typeof(Number(this.state.credit)) == 'number' ? this.state.credit : 0,
      class_time_json: selectedTime.map(t =>
        Object.assign(t, { place: this.state.place })
      ),
      class_time_mask: timeJsonToMask(selectedTime),
      remark: this.state.memo,
    })
    this.setState({ title: '', place: '', memo: '' })
    this.props.stopAdding()
  }

  formGroup(field, label) {
    return(
      <div className='form-group'>
        <label>{label}</label>
        <input
          id={field}
          type='text'
          className='form-control'
          value={this.state[field]}
          onChange={e =>
            this.setState({ [field]: e.target.value })
          }
        />
      </div>
    )
  }

  render() {
    return(
      <form className='form-inline' id='custom-lecture-form'>
        {this.formGroup('title', '과목명')}
        {this.formGroup('credit', '학점')}
        {this.formGroup('place', '장소')}
        {this.formGroup('memo', '메모')}
        <button
          className='btn btn-primary'
          onClick={this.handleClick}
        >
          추가
        </button>
        <button
          className='btn btn-default'
          onClick={this.props.stopAdding}
        >
          취소
        </button>
      </form>
    )
  }
}

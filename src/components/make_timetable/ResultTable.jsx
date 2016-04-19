import React, { Component } from 'react'
import Loading from 'react-loading'

class ResultRow extends Component {
  render() {
    return(
      <tr
        onClick={this.props.handleSelect}
        className={this.props.isSelected ? 'info' : ''}
      >
        <td className='col-course-no'>{this.props.course_number}</td>
        <td className='col-lecture-no'>{this.props.lecture_number}</td>
        <td className='col-title'>
          {this.props.course_title}
          {this.props.isSelected ?
            <button type="button" className="btn btn-success" aria-label="Left Align" onClick={this.props.handleAdd}>
              <span className="glyphicon glyphicon-plus" aria-hidden="true"/>
            </button> :
            null
          }
        </td>
        <td className='col-department'>{this.props.department}</td>
        <td className='col-time'>{this.props.class_time}</td>
        <td className='col-professor'>{this.props.professor}</td>
        <td className='col-remark'>{this.props.remark}</td>
      </tr>
    )
  }
}

export default class ResultTable extends Component {
  constructor() {
    super()
    this.handleSelect = this.handleSelect.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.state = { selectedIdx: -1 }
  }

  handleSelect(idx) {
    if (idx == this.state.selectedIdx) {
      this.setState({ selectedIdx: -1 })
      this.props.handleUnselect()
    } else {
      this.setState({ selectedIdx: idx })
      this.props.handleSelect(this.props.data[idx])
    }
  }

  handleAdd(idx) {
    this.props.handleAdd(this.props.data[idx])
  }

  tabs() {
    return (
      <ul className='tab-list'>
        <li className='tab-button active'>검색결과</li>
        <li className='tab-button'>내 강좌</li>
      </ul>
    )
  }

  render() {
    return(
      <div>
        {this.tabs()}
      <div className='result-wrapper'>
        <table className="table table-hover resultTable">
          <thead>
            <tr>
              <th className='col-course-no'>과목</th>
              <th className='col-lecture-no'>강좌</th>
              <th className='col-title'>이름</th>
              <th className='col-department'>학과</th>
              <th className='col-time'>시간</th>
              <th className='col-professor'>교수</th>
              <th className='col-remark'>비고</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.isQuerying ?
              <tr>
                <td colSpan='6'><Loading type='spin' color='#e3e3e3' /></td>
              </tr> :
              null
            }
            {this.props.data.map((key, idx) => (
              <ResultRow {...key}
                key={key._id}
                handleSelect={this.handleSelect.bind(this, idx)}
                handleAdd={this.handleAdd.bind(this, idx)}
                isSelected={this.state.selectedIdx == idx}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>)
  }
}

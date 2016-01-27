import React, { Component } from 'react'

class ResultRow extends Component {
  render() {
    return(<tr onClick={this.props.handleSelect}
                className={this.props.isSelected ? "info" : ""}>
      <td>{this.props.course_number}</td>
      <td>{this.props.lecture_number}</td>
      <td>
        {this.props.course_title}
        {this.props.isSelected ?
          <button type="button" className="btn btn-success" aria-label="Left Align" onClick={this.props.handleAdd}>
            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
          </button> :
          null}
      </td>
      <td>{this.props.department}</td>
      <td>{this.props.class_time}</td>
      <td>{this.props.remark}</td>
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
    } else {
      this.setState({ selectedIdx: idx })
      this.props.handleSelect(this.props.data[idx])
    }
  }

  handleAdd(idx) {
    console.log("added::" + idx)
    this.props.handleAdd(this.props.data[idx])
  }

  render() {
    return(<div className="result-wrapper">
      <table className="table table-hover resultTable">
        <thead>
          <tr>
            <th>과목번호</th>
            <th>강좌번호</th>
            <th>과목이름</th>
            <th>학과</th>
            <th>시간</th>
            <th>비고</th>
          </tr>
        </thead>
        <tbody>
          {this.props.data.map((key, idx) => <ResultRow {...key}
            key={key._id}
            handleSelect={this.handleSelect.bind(this, idx)}
            handleAdd={this.handleAdd.bind(this, idx)}
            isSelected={this.state.selectedIdx == idx} />)}
        </tbody>
      </table>
    </div>)
  }
}

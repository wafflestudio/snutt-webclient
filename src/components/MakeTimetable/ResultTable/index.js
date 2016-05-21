import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loading from 'react-loading'

import ResultRow from './ResultRow.jsx'
import { selectCourse, unselectCourse, addCourse } from '../../../actions'

class ResultTable extends Component {
  constructor(props) {
    super(props)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.state = {
      selectedIdx: -1,
      displayingResult: true,
    }
  }

  handleSelect(idx) {
    const { dispatch } = this.props
    if (idx == this.state.selectedIdx) {
      this.setState({ selectedIdx: -1 })
      dispatch(unselectCourse())
    } else {
      this.setState({ selectedIdx: idx })
      dispatch(selectCourse(this.props.data[idx]))
    }
  }

  handleAdd(idx) {
    this.props.dispatch(addCourse(this.props.data[idx]))
  }

  tabs() {
    return (
      <ul className='tab-list'>
        <li
          className={`tab-button ${ this.state.displayingResult ? 'active' : ''}`}
        >
          검색결과
        </li>
        <li
          className={`tab-button ${ this.state.displayingResult ? '' : 'active'}`}
        >
          현재 시간표
        </li>
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

function mapStateToProps(state) {
  const { searchResults, isQuerying }  = state;
  return { data: searchResults, isQuerying }
}

export default connect(mapStateToProps)(ResultTable)

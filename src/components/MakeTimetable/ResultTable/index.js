import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loading from 'react-loading'

import ResultTabs from './ResultTabs.jsx'
import ResultRow from './ResultRow.jsx'
import DetailRow from './DetailRow.jsx'
import { selectCourse, unselectCourse, setLeftTab } from '../../../actions'

class ResultTable extends Component {
  constructor(props) {
    super(props)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.updateHover = this.updateHover.bind(this)
    this.state = {
      hoveredIdx: -1,
      selectedIdx: -1,
    }
  }

  handleSelect(idx) {
    const { dispatch } = this.props
    if (idx == this.state.selectedIdx) {
      this.setState({ selectedIdx: -1 })
      dispatch(unselectCourse())
    } else {
      this.setState({ selectedIdx: idx })
      dispatch(selectCourse(this.props.searchResults[idx]))
    }
  }

  handleToggle() {
    this.props.dispatch(setLeftTab(!this.props.searching))
  }

  updateHover(n) {
    this.setState({ hoveredIdx: n })
  }

  render() {
    const { hoveredIdx } = this.state
    const { searching, searchResults, timeTables } = this.props
    const data = (searching ? searchResults : timeTables.tables.get(timeTables.currentIndex).toArray())
    let rows = data.map((key, idx) => (
      <ResultRow {...key}
        rowIndex={idx}
        hovereComputed={idx == this.state.hoveredIdx}
        key={key._id}
        handleSelect={this.handleSelect.bind(this, idx)}
        updateHover={this.updateHover}
        isSelected={this.state.selectedIdx == idx}
      />
    ))
    if (hoveredIdx != -1)
      rows.splice(hoveredIdx+1, 0,
        <DetailRow
          key={0}
          course={data[hoveredIdx]}
          rowIndex={hoveredIdx}
          updateHover={this.updateHover}
        />
      )
    return(
      <div>
        <ResultTabs
          searching={searching}
          handleToggle={this.handleToggle}
        />
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
              {rows}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { isQuerying, searchResults, timeTables, leftTabSearching }  = state;
  return { isQuerying, searchResults, timeTables, searching: leftTabSearching }
}

export default connect(mapStateToProps)(ResultTable)

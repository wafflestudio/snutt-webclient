import React, { Component } from 'react'
import { connect } from 'react-redux'

import DepartmentSuggestion from './DepartmentSuggestion.jsx'
import TimeQuery from './TimeQuery.jsx'
import { addQuery, removeQuery, toggleTimeselect } from '../../../actions'
import { credits, academicYears, foundations, knowledges,
          generals, classifications } from './options'


class SearchFilter extends Component {
  constructor() {
    super()
    this.toggleQuery = this.toggleQuery.bind(this)
    this.toggleTimeselect = this.toggleTimeselect.bind(this)
    this.renderCheckBoxes = this.renderCheckBoxes.bind(this)
    this.renderTimeSelect = this.renderTimeSelect.bind(this)
  }

  toggleQuery(memberName, value, checked) {
    const { dispatch } = this.props
    if (checked)
      dispatch(removeQuery(memberName, value))
    else
      dispatch(addQuery(memberName, value))
  }

  toggleTimeselect(e) {
    const { dispatch } = this.props
    e.stopPropagation()
    dispatch(toggleTimeselect())
  }

  renderCheckBoxes(label, items, memberName) {
    return(
      <div className='form-group'>
        <label className='col-md-2 control-label'>{label}</label>
        <div className='col-md-8'>
          {items.map((val, idx) => {
            const checked = this.props.query.get(memberName).has(val.value)
            return(
              <label
                key={idx}
                className='checkbox-inline'
              >
                <input
                  type='checkbox'
                  checked={checked}
                  onClick={this.toggleQuery.bind(this, memberName, val.value, checked)}
                />
                {val.name}
              </label>
            )
          })}
        </div>
      </div>
    )
  }

  renderTimeSelect() {
    return(
      <div className='form-group'>
        <label className='col-md-2 control-label'>시간대 검색</label>
        <div className='col-md-8'>
          <div
            className="btn btn-default"
            onClick={this.toggleTimeselect}
          >
            시간대 선택하기
            <span className="glyphicon glyphicon-pencil" aria-hidden="true" />
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className='row'>
        <div className='col-lg-8 col-lg-offset-2'>
          <div className="search-filter-wrapper">
            <form
              className='form-horizontal search-filter'
              id={this.props.on ? 'filter-active' : ''}
            >
              {this.renderCheckBoxes('학점', credits, 'credit')}
              {this.renderCheckBoxes('학년', academicYears, 'academic_year')}
              {this.renderTimeSelect()}
              {this.renderCheckBoxes('구분', classifications, 'classification')}
              {this.renderCheckBoxes('학문의 기초', foundations, 'category')}
              {this.renderCheckBoxes('학문의 세계', knowledges, 'category')}
              {this.renderCheckBoxes('선택 교양', generals, 'category')}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { query: state.query }
}

export default connect(mapStateToProps)(SearchFilter)



import React, { Component } from 'react'
import { connect } from 'react-redux'
import Immutable from 'Immutable'

import DepartmentSuggestion from './DepartmentSuggestion.jsx'
import TimeQuery from './TimeQuery.jsx'
import { addQuery, removeQuery, setQue } from '../../../actions'
import { credits, academicYears, foundations, knowledges,
          generals, classifications } from './options'


class SearchFilter extends Component {
  constructor() {
    super()
    this.toggleQuery = this.toggleQuery.bind(this)
    this.renderCheckBoxes = this.renderCheckBoxes.bind(this)
    this.renderDepartment = this.renderDepartment.bind(this)
  }

  toggleQuery(memberName, value, checked) {
    const { dispatch } = this.props
    if (checked)
      dispatch(removeQuery(memberName, value))
    else
      dispatch(addQuery(memberName, value))
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

  renderDepartment() {
    return(
      <div className='form-group'>
        <label className='col-md-2 control-label'>학과</label>
        <div className="col-md-8">
          {this.props.query.get('department').map((dep, idx) =>
            <span className='label label-default selected-department' key={idx}>{dep}</span>
          )}
          <DepartmentSuggestion
            selectedDepartments={this.props.query.department}
            updateDepartments={deps =>this.dispatch(setQuery('department', Immutable.Set(deps)))}
          />
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
              {this.renderDepartment()}
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



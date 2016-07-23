import React, { Component } from 'react'
import { connect } from 'react-redux'

import update from 'react-addons-update'
import DepartmentSuggestion from './DepartmentSuggestion.jsx'
import TimeQuery from './TimeQuery.jsx'

// 학점
var credits = [
  { name: '1학점', value: 1 },
  { name: '2학점', value: 2 },
  { name: '3학점', value: 3 },
  { name: '4학점', value: 4 },
]

// 학문의 기초
var foundations = [
  { name: '사고와 표현', value: 40 },
  { name: '외국어', value: 41 },
  { name: '수량적 분석과 추론', value: 42 },
  { name: '과학적 사고와 실험', value: 43 },
  { name: '컴퓨터와 정보 활용', value: 44 },
]

// 학문의 세계
var knowledges = [
  { name: '언어와 문학', value: 45 },
  { name: '문화와 예술', value: 46 },
  { name: '역사와 철학', value: 47 },
  { name: '정치와 경제', value: 48 },
  { name: '인간과 사회', value: 49 },
  { name: '자연과 기술', value: 50 },
  { name: '생명과 환경', value: 51 },
]

// 선택 교양
var generals = [
  { name: '체육', value: 52 },
  { name: '예술실기', value: 53 },
  { name: '대학과 리더십', value: 54 },
  { name: '창의와 융합', value: 55 },
  { name: '한국의 이해', value: 56 },
]

class SearchFilter extends Component {
  constructor() {
    super()
    this.handleCreditToggle = this.handleCreditToggle.bind(this)
    this.handleWorldToggle = this.handleWorldToggle.bind(this)
    this.worldCheckBoxes = this.worldCheckBoxes.bind(this)
    this.handleTimeSelect = this.handleTimeSelect.bind(this)
    this.state = {
      query: {
        year: 2016,
        semester: 1,
        credit: [],
        department: [],
        world: [],
        time: [],
      },
      timeSelecting: false,
    }
  }

  handleCreditToggle(value) {
    var idx = this.state.query.credit.indexOf(value)
    if (idx != -1) {
      this.setState({
        query: update(this.state.query, { credit: { $splice: [[idx, 1]]}}),
      })
    } else {
      this.setState({
        query: update(this.state.query, { credit: { $push: [value]}}),
      })
    }
  }

  handleWorldToggle(value) {
    var idx = this.state.query.world.indexOf(value)
    if (idx != -1) {
      this.setState({
        query: update(this.state.query, { world: { $splice: [[idx, 1]]}}),
      })
    } else {
      this.setState({
        query: update(this.state.query, { world: { $push: [value]}}),
      })
    }
  }

  // Convert selected cells into bitmask
  // cells are 6 x 26 2d array
  handleTimeSelect(arr) {
    // code from snutt/data/update_lectures.js
    var timeMasks  = []
    for (var i = 0; i < 6; i++) {
      var mask = 0
      for (var j = 0; j < 25; j++) {
        if (arr[i][j] == 1)
          mask = mask + 1
        mask = mask << 1
      }
      timeMasks.push(mask)
    }
    this.setState({
      query: update(this.state.query, { world: { $set: timeMasks }}),
    })
  }

  worldCheckBoxes(label, data) {
    return (
      <div className='form-group'>
        <label className='col-md-2 control-label'>{label}</label>
        <div className='col-md-8'>
          {data.map(e=>(
            <label key={e.value} className='checkbox-inline'>
              <input
                type='checkbox'
                checked={this.state.query.world.indexOf(e.value) != -1}
                onClick={()=>this.handleWorldToggle(e.value)}
              />
              {e.name}
            </label>
          ))}
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
              //credit
              <div className='form-group'>
                <label className='col-md-2 control-label'>학점</label>
                <div className='col-md-8'>
                  {credits.map(f=>(
                    <label key={f.value} className='checkbox-inline'>
                      <input
                        type='checkbox'
                        checked={this.state.query.world.indexOf(f.value) != -1}
                        onClick={()=>this.handleWorldToggle(f.value)}
                      />
                      {f.name}
                    </label>
                  ))}
                </div>
              </div>

              <div className='form-group'>
                <label className='col-md-2 control-label'>학과</label>
                <div className="col-md-8">
                  {this.state.query.department.map((dep, idx) =>
                    <span className='label label-default selected-department' key={idx}>{dep}</span>
                  )}
                  <DepartmentSuggestion
                    selectedDepartments={this.state.query.department}
                    updateDepartments={deps=>this.setState({
                      query: update(this.state.query, {
                        department: {$set: deps },
                      }),
                    })}
                  />
                </div>
              </div>

              <div className='form-group'>
                <label className='col-md-2 control-label'>시간</label>
                <div className='col-md-8' id='timeselector-toggle'>
                  <button
                    className='btn btn-default'
                    onClick={e=>{
                      e.preventDefault()
                      this.setState({timeSelecting: !this.state.timeSelecting})
                    }}
                  >
                    <span className="glyphicon glyphicon-pencil" aria-hidden="true"/>
                    {this.state.timeSelecting ? '확인' : '선택하기' }
                  </button>
                  {this.state.timeSelecting ?
                    <TimeQuery
                      selectionHook={this.handleTimeSelect}
                    />
                    : null
                  }
                </div>
              </div>
              {this.worldCheckBoxes('학문의 기초', foundations)}
              {this.worldCheckBoxes('학문의 세계', knowledges)}
              {this.worldCheckBoxes('선택 교양', generals)}
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



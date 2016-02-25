import React, { Component } from 'react'
import update from 'react-addons-update'

export default class SearchFilter extends Component {
  constructor() {
    super()
    this.handleCreditCheck = this.handleCreditCheck.bind(this)
    this.state = {
      query: {
        year: 2016,
        semester: 1,
        credit: []
      },
      credit: [false, false, false, false]
    }
  }

  handleCreditCheck(index) {
    var newState = update(this.state.credit, {[index]: {$set: !this.state.credit[index]}})
    var newQuery = []
    for (var i = 0; i < 4; i++) {
      if (newState[i])  newQuery.push(i+1)
    }
    this.setState({
      credit: newState,
      query: update(this.state.query, { credit: { $set: newQuery } })
    })
  }

  render() {
    return (
      <div className='row'>
        <form className='form-horizontal col-md-8 col-md-offset-1'>

          <div className='form-group'>
            <label className='col-md-2 control-label'>학점</label>
            <div className='col-md-8'>
              <label className="checkbox-inline">
                <input
                  type="checkbox"
                  checked={this.state.credit[0]}
                  onClick={()=>this.handleCreditCheck(0)}
                />
                1학점
              </label>
              <label className="checkbox-inline">
                <input
                  type="checkbox"
                  checked={this.state.credit[1]}
                  onClick={()=>this.handleCreditCheck(1)}
                />
                2학점
              </label>
              <label className="checkbox-inline">
                <input
                  type="checkbox"
                  checked={this.state.credit[2]}
                  onClick={()=>this.handleCreditCheck(2)}
                />
                3학점
              </label>
              <label className="checkbox-inline">
                <input
                  type="checkbox"
                  checked={this.state.credit[3]}
                  onClick={()=>this.handleCreditCheck(3)}
                />
                4학점 이상
              </label>
            </div>
          </div>

          <div className='form-group'>
            <label className='col-md-2 control-label'>학과</label>
            <div className="col-md-8">
              <input type="text" className="form-control" placeholder="학과명을입력하세요" />
            </div>
          </div>

          <div className='form-group'>
            <label className='col-md-2 control-label'>시간</label>
            <div className='col-md-8'>
              <button className='btn btn-default'>
                <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>선택하기
              </button>
            </div>
          </div>

          <div className='form-group'>
            <label className='col-md-2 control-label'>핵심교양</label>
            <div className='col-md-8'>
              <label className="checkbox-inline">
                <input type="checkbox" />문학과 예술
              </label>
              <label className="checkbox-inline">
                <input type="checkbox" />사회와 이념
              </label>
              <label className="checkbox-inline">
                <input type="checkbox" />역사와 철학
              </label>
              <label className="checkbox-inline">
                <input type="checkbox" />생명과 환경
              </label>
              <label className="checkbox-inline">
                <input type="checkbox" />자연과 기술
              </label>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

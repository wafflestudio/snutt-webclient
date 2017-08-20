import React, { Component } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import DepartmentForm from './DepartmentForm.jsx';
import TimeQuery from './TimeQuery.jsx';
import { addQuery, removeQuery, updateQuery, toggleTimeselect } from '../../../actions';
import { credits, academicYears, foundations, knowledges,
          generals, classifications } from './options';
import { complement } from './TimeQuery.jsx';
import RefreshIcon from '../../../../assets/ic-reset-normal.svg';

class SearchFilter extends Component {
  constructor() {
    super();
    this.toggleQuery = this.toggleQuery.bind(this);
    this.toggleTimeselect = this.toggleTimeselect.bind(this);
    this.freeslotsOnly = this.freeslotsOnly.bind(this);
    this.renderCheckBoxes = this.renderCheckBoxes.bind(this);
    this.renderTimeSelect = this.renderTimeSelect.bind(this);
    this.renderDepartment = this.renderDepartment.bind(this);
    this.state = { freeslotsOnly: false };
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  toggleQuery(memberName, value, checked) {
    console.log(memberName, value, checked);
    const { dispatch } = this.props;
    if (checked) { dispatch(removeQuery(memberName, value)); } else { dispatch(addQuery(memberName, value)); }
  }

  toggleTimeselect(e) {
    const { dispatch } = this.props;
    e.stopPropagation();
    dispatch(toggleTimeselect());
  }

  freeslotsOnly(e) {
    const { dispatch, currentLectures } = this.props;
    const { freeslotsOnly: prevState } = this.state;
    if (!prevState) {
      const masks = currentLectures.map(val => val.class_time_mask);
      dispatch(updateQuery('time_mask', () => Immutable.List(complement(masks))));
    } else {
      dispatch(updateQuery('time_mask', () => Immutable.List([0, 0, 0, 0, 0, 0])));
    }
    this.setState({ freeslotsOnly: !this.state.freeslotsOnly });
  }

  renderCheckBoxes(label, items, memberName) {
    return (
      <div className="form-group">
        <label className="col-md-2 control-label field">{label}</label>
        <div className="col-md-10">
          {items.map((val, idx) => {
            const checked = this.props.query.get(memberName).has(val.value);
            return (
              <label
                key={idx}
                className="checkbox-inline"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onClick={this.toggleQuery.bind(this, memberName, val.value, checked)}
                />
                <div><span>{val.name}</span></div>
              </label>
            );
          })}
        </div>
      </div>
    );
  }

  renderTimeSelect() {
    return (
      <div className="form-group">
        <label className="col-md-2 control-label">시간대 검색</label>
        <div className="col-md-10">
          <label className="checkbox-inline">
            <input
              type="checkbox"
              onClick={this.freeslotsOnly}
              checked={this.state.freeslotsOnly}
            />
            <div><span>빈 시간만 검색하기</span></div>
          </label>
          <label className="checkbox-inline">
            <input
              type="checkbox"
              onClick={this.freeslotsOnly}
              checked={false}
            />
            <div><span>시간대 직접 선택하기</span></div>
          </label>
          <div
            className="open-timeselector"
            onClick={this.toggleTimeselect}
          >
            선택창 열기
           </div>
        </div>
      </div>
    );
  }

  renderDepartment() {
    const { departmentTags } = this.props;
    return (
      <div className="form-group">
        <label className="col-md-2 control-label">학과명 선택</label>
        <div className="col-md-8">
          <DepartmentForm />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="searchpanel-wrapper">
        <div id="title-wrapper">
          <span id="title">상세조건 설정                       </span>
          <span id="condition-count">3</span>
          <RefreshIcon />
        </div>
        <hr />
        <form
          className="form-horizontal search-filter"
          id={this.props.on ? 'filter-active' : ''}
          onSubmit={this.handleSubmit}
        >
          {this.renderDepartment()}
          {this.renderCheckBoxes('학년', academicYears, 'academic_year')}
          {this.renderCheckBoxes('학점', credits, 'credit')}
          {this.renderCheckBoxes('구분', classifications, 'classification')}
          {this.renderCheckBoxes('학문의 기초', foundations, 'category')}
          {this.renderCheckBoxes('학문의 세계', knowledges, 'category')}
          {this.renderCheckBoxes('선택 교양', generals, 'category')}
          {this.renderTimeSelect()}
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { tableList: { currentId, tableMap }, query } = state;
  const currentLectures = currentId == null ? [] : tableMap[currentId].lecture_list;
  return { query, currentLectures };
}

export default connect(mapStateToProps)(SearchFilter);

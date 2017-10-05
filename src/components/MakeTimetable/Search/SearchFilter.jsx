import React, { Component } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import Modal from 'react-modal';

import DepartmentForm from './DepartmentForm.jsx';
import TimeQuery from './TimeQuery.jsx';
import RefreshIcon from '../../../../assets/ic-reset-normal.svg';

import { addQuery, removeQuery, resetQuery, toggleUseTime, selectTimeMode } from '../../../actions';
import { credits, academicYears, foundations, knowledges,
          generals, classifications } from './options';

const EMPTY_MASK = Immutable.List([0, 0, 0, 0, 0, 0, 0]);

function mapStateToProps(state) {
  const { tableList: { currentId, tableMap }, query,
    filter: { time: selectingTime, useTime, selectTime } } = state;
  const currentLectures = currentId == null ? [] : tableMap[currentId].lecture_list;
  // Deduct 7 because empty timemasks's count is 7
  let activeFieldCounts = query.valueSeq().reduce((prev, current) => prev + current.count(), 0) - 7;
  if (!query.get('time_mask').equals(EMPTY_MASK)) {
    activeFieldCounts += 1;
  }
  return { query, activeFieldCounts, currentLectures, selectingTime, useTime, selectTime };
}

const mapDispatchToProps = dispatch => ({
  resetQuery: () => dispatch(resetQuery()),
  toggleQuery: (name, value, checked) => {
    if (checked) {
      dispatch(removeQuery(name, value));
    } else {
      dispatch(addQuery(name, value));
    }
  },
  toggleUseTime: () => dispatch(toggleUseTime()),
  searchEmptySlot: () => dispatch(selectTimeMode(false)),
  searchSelectedSlot: () => dispatch(selectTimeMode(true)),
});

class SearchFilter extends Component {
  constructor() {
    super();
    this.toggleTimeselect = this.toggleTimeselect.bind(this);
    this.freeslotsOnly = this.freeslotsOnly.bind(this);
    this.renderCheckBoxes = this.renderCheckBoxes.bind(this);
    this.renderTimeSelect = this.renderTimeSelect.bind(this);
    this.state = { freeslotsOnly: false };
  }

  toggleTimeselect(e) {
    e.preventDefault();
    console.log('Toggle Timeselect');
    this.props.toggleTimeselect();
  }

  freeslotsOnly(e) {
    e.preventDefault();
    const { currentLectures } = this.props;
    const { freeslotsOnly } = this.state;
    this.props.toggleFreetimeOnly(currentLectures, freeslotsOnly);
    this.setState({ freeslotsOnly: !freeslotsOnly });
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
                  onClick={this.props.toggleQuery.bind(this, memberName, val.value, checked)}
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
    const { useTime, selectTime } = this.props;
    return (
      <div className="form-group">
        <label className="col-md-2 control-label">시간대 검색</label>
        <div className="col-md-10">
          <label className="checkbox-inline">
            <input
              type="checkbox"
              onClick={this.props.toggleUseTime}
              value={useTime}
            />
            <div><span>시간대 검색</span></div>
          </label>
          <label className="radio-inline">
            <input
              type="radio"
              onClick={this.props.searchEmptySlot}
              // Used !! in 'checked' prop in order to suppress warning
              // https://github.com/facebook/react/issues/6779
              checked={!!(useTime && !selectTime)}
              disabled={!useTime}
            />
            <div><span>빈 시간대만 검색하기</span></div>
          </label>
          <label className="radio-inline">
            <input
              type="radio"
              onClick={this.props.searchSelectedSlot}
              checked={!!(useTime && selectTime)}
              disabled={!useTime}
            />
            <div><span>시간대 직접 선택하기</span></div>
          </label>
          <div className="timeselector-wrapper">
            <div
              className={`open-timeselector ${useTime && selectTime ? 'enabled' : ''}`}
              onClick={this.toggleTimeselect}
            >
              선택창 열기
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderDepartment() {
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
    const { selectingTime, activeFieldCounts } = this.props;
    return (
      <div className="searchpanel-wrapper">
        <div id="title-wrapper">
          <span id="title">상세조건 설정</span>
          <span id="condition-count">{activeFieldCounts}</span>
          <RefreshIcon
            className={activeFieldCounts ? 'svg-icon' : 'svg-icon disabled'}
            onClick={this.props.resetQuery}
          />
        </div>
        <hr />
        <form
          className="form-horizontal search-filter"
          id={this.props.on ? 'filter-active' : ''}
          onSubmit={e => e.preventDefault()}
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
        {selectingTime ?
          <Modal
            isOpen
            className="snutt__modal"
            overlayClassName="snutt__modal-overlay"
          >
            <TimeQuery />
          </Modal> :
          null
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilter);

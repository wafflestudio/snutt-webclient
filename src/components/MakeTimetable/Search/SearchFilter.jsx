import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import DepartmentForm from './DepartmentForm.jsx';
import TimeQuery from './TimeQuery.jsx';
import { ReactComponent as RefreshIcon } from 'assets/ic-reset-normal.svg';

import {
  addQuery,
  removeQuery,
  resetQuery,
  toggleUseTime,
  selectTimeMode,
  toggleTimePanel,
  toggleSearchPanel,
} from '../../../actions';
import {
  credits,
  academicYears,
  foundations,
  knowledges,
  generals,
  classifications,
  etcs,
} from './options';

function mapStateToProps(state) {
  const {
    tableList: { currentId, tableMap },
    query,
    filter: { timePanel, useTime, searchEmptySlot },
  } = state;
  const currentLectures =
    currentId == null ? [] : tableMap[currentId].lecture_list;
  // Deduct 7 because empty timemasks's count is 7
  let activeFieldCounts =
    query.valueSeq().reduce((prev, current) => prev + current.count(), 0) - 7;
  if (useTime) {
    activeFieldCounts += 1;
  }
  // if (!query.get('time_mask').equals(EMPTY_MASK) &&) {
  //   activeFieldCounts += 1;
  // }
  return {
    query,
    activeFieldCounts,
    currentLectures,
    timePanel,
    useTime,
    searchingEmptySlot: searchEmptySlot,
  };
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
  toggleTimePanel: () => dispatch(toggleTimePanel()),
  toggleSearchPanel: () => dispatch(toggleSearchPanel()),
  searchEmptySlot: () => dispatch(selectTimeMode(true)),
  searchSelectedSlot: () => dispatch(selectTimeMode(false)),
});

class SearchFilter extends Component {
  constructor() {
    super();
    this.toggleTimePanel = this.toggleTimePanel.bind(this);
    this.freeslotsOnly = this.freeslotsOnly.bind(this);
    this.renderCheckBoxes = this.renderCheckBoxes.bind(this);
    this.renderTimeSelect = this.renderTimeSelect.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = { freeslotsOnly: false };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, false);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, false);
  }

  handleClickOutside(e) {
    if (
      e.target.className &&
      e.target.className.includes &&
      !this.node.contains(e.target) &&
      !this.props.timePanel
    ) {
      if (
        e.target.className.includes('btn-timeselector') ||
        e.target.className.includes('department_item') ||
        e.target.className.includes('tag-selected') ||
        e.target.className.includes('span-selected')
      ) {
        return;
      }
      this.props.toggleSearchPanel();
    }
  }

  toggleTimePanel(e) {
    e.preventDefault();
    console.log('Toggle Time Panel');
    this.props.toggleTimePanel();
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
              <label key={idx} className="checkbox-inline">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={this.props.toggleQuery.bind(
                    this,
                    memberName,
                    val.value,
                    checked,
                  )}
                />
                <div>
                  <span>{val.name}</span>
                </div>
              </label>
            );
          })}
        </div>
      </div>
    );
  }

  renderTimeSelect() {
    const { useTime, searchEmptySlot, searchingEmptySlot } = this.props;
    return (
      <div className="form-group">
        <label className="col-md-2 control-label">시간대 검색</label>
        <div className="col-md-10">
          <label className="checkbox-inline">
            <input
              type="checkbox"
              onChange={this.props.toggleUseTime}
              checked={useTime}
            />
            <div>
              <span>시간대 검색</span>
            </div>
          </label>
          <label className="radio-inline">
            <input
              type="radio"
              onChange={searchEmptySlot}
              // Used !! in 'checked' prop in order to suppress warning
              // https://github.com/facebook/react/issues/6779
              checked={!!(useTime && searchingEmptySlot)}
              disabled={!useTime}
            />
            <div>
              <span>빈 시간대만 검색하기</span>
            </div>
          </label>
          <label className="radio-inline">
            <input
              type="radio"
              onChange={this.props.searchSelectedSlot}
              checked={!!(useTime && !searchingEmptySlot)}
              disabled={!useTime}
            />
            <div>
              <span>시간대 직접 선택하기</span>
            </div>
          </label>
          <div className="timeselector-wrapper">
            <div
              className={`open-timeselector ${
                useTime && !searchingEmptySlot ? 'enabled' : ''
              }`}
              onClick={this.toggleTimePanel}
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
    const { timePanel, activeFieldCounts } = this.props;
    return (
      <div
        className="searchpanel-wrapper"
        ref={node => {
          this.node = node;
        }}
      >
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
          {this.renderCheckBoxes('기타', etcs, 'etc')}
          {this.renderTimeSelect()}
        </form>
        {timePanel ? (
          <Modal
            isOpen
            className="time-query-overlay"
            overlayClassName="snutt__modal-overlay"
          >
            <TimeQuery />
          </Modal>
        ) : null}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchFilter);

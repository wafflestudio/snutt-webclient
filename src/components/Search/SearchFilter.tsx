import React, { Component } from 'react';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import { AppState } from 'store';
import { Timetable, LectureQueryFilter, LectureQueryFilterOption } from 'types';
import { SubType } from 'utils/typeHelper';
import DepartmentForm from './DepartmentForm.jsx';
import TimeQuery from './TimeQuery.jsx';
import { ReactComponent as RefreshIcon } from 'assets/ic-reset-normal.svg';

import {
  toggleSearchPanel,
  resetQuery,
  searchActionTypes,
  selectTimeMode,
  toggleTimePanel,
  toggleUseTime,
  toggleQuery,
} from 'store/search/actions';

import {
  credits,
  academicYears,
  foundations,
  knowledges,
  generals,
  classifications,
  etcs,
} from './options';

const mapStateToProps = (state: AppState) => {
  const {
    tableList: { viewTableId, tableMap },
    search: {
      query,
      filter: { panel, timePanel, useTime, searchEmptySlot },
    },
  } = state;
  const currentLectures =
    viewTableId &&
    tableMap[viewTableId] &&
    (tableMap[viewTableId] as Timetable).lecture_list
      ? (tableMap[viewTableId] as Timetable).lecture_list
      : [];

  // Deduct 7 because empty timemasks's count is 7
  let activeFieldCounts = Object.values(query).reduce<number>(
    (acc, current) => {
      if (current instanceof Array) {
        return acc + current.length;
      }
      return acc;
    },
    0,
  );
  if (useTime) {
    activeFieldCounts += 1;
  }
  return {
    isOpen: panel,
    query,
    activeFieldCounts,
    currentLectures,
    timePanel,
    useTime,
    searchingEmptySlot: searchEmptySlot,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<searchActionTypes>) => ({
  resetQuery: () => dispatch(resetQuery()),
  toggleQuery: (name: keyof LectureQueryFilter, value: string | number) => {
    toggleQuery(name, value);
  },
  toggleUseTime: () => dispatch(toggleUseTime()),
  toggleTimePanel: () => dispatch(toggleTimePanel()),
  toggleSearchPanel: () => dispatch(toggleSearchPanel()),
  searchEmptySlot: () => dispatch(selectTimeMode(true)),
  searchSelectedSlot: () => dispatch(selectTimeMode(false)),
});

interface OwnProps {}
interface OwnState {
  freeslotsOnly: boolean;
}
type StateProps = ReturnType<typeof mapStateToProps>;
type Props = OwnProps & StateProps & ReturnType<typeof mapDispatchToProps>;

class SearchFilter extends Component<Props, OwnState> {
  state = {
    freeslotsOnly: false,
  };
  node: Node | null = null;

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, false);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, false);
  }

  handleClickOutside = (e: MouseEvent) => {
    const target = e.target as Element;
    if (
      target.className &&
      this.node &&
      !this.node.contains(target) &&
      !this.props.timePanel
    ) {
      if (
        target.className.includes('btn-timeselector') ||
        target.className.includes('department_item') ||
        target.className.includes('tag-selected') ||
        target.className.includes('span-selected')
      ) {
        return;
      }
      this.props.toggleSearchPanel();
    }
  };

  toggleTimePanel = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Toggle Time Panel');
    this.props.toggleTimePanel();
  };

  freeslotsOnly = (e: React.MouseEvent) => {
    e.preventDefault();
    const { freeslotsOnly } = this.state;
    this.setState({ freeslotsOnly: !freeslotsOnly });
  };

  renderCheckBoxes = (
    label: string,
    items: LectureQueryFilterOption[],
    memberName: keyof LectureQueryFilter,
  ) => {
    return (
      <div className="form-group">
        <label className="col-md-2 control-label field">{label}</label>
        <div className="col-md-10">
          {items.map((val, idx) => {
            const checked = this.props.query[memberName].includes(
              val.value as (string & number),
            );
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
  };

  renderTimeSelect = () => {
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
  };

  renderDepartment = () => {
    return (
      <div className="form-group">
        <label className="col-md-2 control-label">학과명 선택</label>
        <div className="col-md-8">
          <DepartmentForm />
        </div>
      </div>
    );
  };

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
          id={this.props.isOpen ? 'filter-active' : ''}
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

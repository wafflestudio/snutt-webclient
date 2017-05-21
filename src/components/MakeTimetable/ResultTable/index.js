import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from 'react-loading';

import ResultTabs from './ResultTabs.jsx';
import ResultRow from './ResultRow.jsx';
import DetailRow from './DetailRow.jsx';
import { setLeftTab, hoverCourse, unhoverCourse } from '../../../actions';

function mapStateToProps(state) {
  const { isQuerying, searchResults, leftTabSearching,
    tableList: { currentId, tableMap } } = state;
  const addedLectures = currentId ? tableMap[currentId].lecture_list : [];
  return { isQuerying, searchResults, addedLectures, searching: leftTabSearching };
}

const mapDispatchToProps = dispatch => ({
  onSetLeftTab: isSearching => dispatch(setLeftTab(!isSearching)),
  onHoverCourse: course => dispatch(hoverCourse(course)),
  onUnhoverCourse: () => dispatch(unhoverCourse()),
});

class ResultTable extends Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.updateHover = this.updateHover.bind(this);
    this.state = {
      hoveredIdx: -1,
      selectedIdx: -1,
    };
  }

  handleToggle() {
    this.props.onSetLeftTab(this.props.searching);
  }

  updateHover(n) {
    const { searching, searchResults } = this.props;
    if (searching && n !== -1) {
      this.props.onHoverCourse(searchResults[n]);
    } else if (searching) {
      this.props.onUnhoverCourse();
    }
    this.setState({ hoveredIdx: n });
  }

  render() {
    const { hoveredIdx } = this.state;
    const { searching, searchResults, addedLectures } = this.props;
    const data = (searching ? searchResults : addedLectures);
    const rows = data.map((key, idx) => (
      <ResultRow
        {...key}
        rowIndex={idx}
        hoverComputed={idx === this.state.hoveredIdx}
        key={key._id}
        updateHover={this.updateHover}
        isSelected={this.state.selectedIdx === idx}
      />
    ));
    if (hoveredIdx != -1) {
      rows.splice(hoveredIdx + 1, 0,
        <DetailRow
          key={0}
          course={data[hoveredIdx]}
          rowIndex={hoveredIdx}
          updateHover={this.updateHover}
        />,
      );
    }
    return (
      <div>
        <ResultTabs
          searching={searching}
          handleToggle={this.handleToggle}
        />
        <div className="result-wrapper">
          <table className="table table-hover resultTable">
            <thead>
              <tr>
                <th className="col-course-no">번호</th>
                <th className="col-title">이름</th>
                <th className="col-credit">학점</th>
                <th className="col-department">학과</th>
                <th className="col-time">시간</th>
                <th className="col-location">장소</th>
                <th className="col-professor">교수</th>
                <th className="col-remark">비고</th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.isQuerying ?
                  <tr>
                    <td colSpan="6"><Loading type="spin" color="#e3e3e3" /></td>
                  </tr> :
                null
              }
              {rows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultTable);

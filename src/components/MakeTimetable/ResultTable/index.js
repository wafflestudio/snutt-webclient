import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from 'react-loading';

import ResultTabs from './ResultTabs.jsx';
import ResultRow from './ResultRow.jsx';
import DetailRow from './DetailRow.jsx';
import { setLeftTab, hoverCourse, unhoverCourse } from '../../../actions';

function mapStateToProps(state) {
  const { isQuerying, searchResults, leftTabSearching,
    tableList: { viewTableId, viewLectures } } = state;
  return { isQuerying, searchResults, viewLectures, searching: leftTabSearching };
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
    const { searching, searchResults, viewLectures } = this.props;
    const data = (searching ? searchResults : (viewLectures ? viewLectures : []));
    const rows = (data.length > 0) ? data.map((key, idx) => (
        <ResultRow
          {...key}
          rowIndex={idx}
          hoverComputed={idx === this.state.hoveredIdx}
          key={key._id}
          updateHover={this.updateHover}
          isSelected={this.state.selectedIdx === idx}
        />
      ))
      : (searching) ? (<tr><td colSpan = {8}>검색 결과가 없습니다.</td></tr>)
      : (<tr><td colSpan = {8}>추가된 강의가 없습니다.</td></tr>)
    
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
          searchAvailable={searchResults !== null}
          handleToggle={this.handleToggle}
        />
        <div className="result-wrapper">
          <table className="table table-hover resultTable">
            <tbody>
              {
                this.props.isQuerying ?
                  <tr>
                    <td><Loading type="spin" color="#e3e3e3" /></td>
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

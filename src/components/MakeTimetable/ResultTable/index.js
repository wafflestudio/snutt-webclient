import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from 'react-loading';

import ResultTabs from './ResultTabs.jsx';
import ResultRow from './ResultRow.jsx';
import { setLeftTab } from '../../../actions';

function mapStateToProps(state) {
  const {
    isQuerying,
    searchResults,
    leftTabSearching,
    tableList: { viewTableId, tableMap },
  } = state;
  const viewLectures =
    viewTableId && tableMap[viewTableId]
      ? tableMap[viewTableId].lecture_list
      : [];
  return {
    isQuerying,
    searchResults,
    viewLectures,
    searching: leftTabSearching,
  };
}

const mapDispatchToProps = dispatch => ({
  onSetLeftTab: isSearching => dispatch(setLeftTab(!isSearching)),
});

class ResultTable extends Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.props.onSetLeftTab(this.props.searching);
  }

  render() {
    const { searching, searchResults, viewLectures } = this.props;
    const data = searching ? searchResults : viewLectures || [];
    return (
      <div>
        <ResultTabs
          searching={searching}
          searchAvailable={searchResults !== null}
          handleToggle={this.handleToggle}
        />
        <div className="result-wrapper">
          <table className="table resultTable">
            <tbody>
              {this.props.isQuerying ? (
                <tr>
                  <td>
                    <div className="tr-result-loader">
                      <Loading type="spin" color="#e3e3e3" />
                    </div>
                  </td>
                </tr>
              ) : (
                data.length > 0 ? (
                  data.map(row => (
                    <ResultRow key={row._id} lecture={row} searching={searching} />
                  ))
                ) : searching ? (
                  <tr>
                    <td>검색 결과가 없습니다.</td>
                  </tr>
                ) : (
                  <tr>
                    <td>추가된 강의가 없습니다.</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResultTable);

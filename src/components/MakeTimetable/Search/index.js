import React, { Component } from 'react';
import { connect } from 'react-redux';

import { sendQuery, toggleTimeselect } from '../../../actions';
import SearchBar from './SearchBar.jsx';
import SearchFilter from './SearchFilter.jsx';
import Modal from 'react-modal';
import TimeQuery from './TimeQuery.jsx';

function mapStateToProps(state) {
  const { courseBook, query,
          filter: { panel: filterOn, time: selectingTime } } = state;
  return {
    current: courseBook.get('current'),
    filterOn,
    selectingTime,
    queries: query.toJS(),
  };
}

const mapDispatchToProps = dispatch => ({
  sendQuery: query => dispatch(sendQuery(query)),
  togglieTimeselect: () => dispatch(toggleTimeselect),
});


class Search extends Component {
  constructor() {
    super();
    this.composeQuery = this.composeQuery.bind(this);
    this.toggleTimeselect = () => this.props.toggleTimeselect();
  }

  composeQuery(txt) {
    const { current, queries } = this.props;
    const query = { year: current.year, semester: current.semester, title: txt, limit: 200 };

    // Add valid(?) fields to query
    for (const key in queries) {
      const value = queries[key];
      if (typeof (value) === 'object' && value.length > 0) { query[key] = value; }
    }
    if (query.time_mask.filter(mask => mask !== 0).length === 0) { delete query.time_mask; }

    this.props.sendQuery(query);
  }

  toggleTimeselect() {
    this.props.toggleTimeselect();
  }

  render() {
    const { filterOn, selectingTime } = this.props;
    return (
      <div>
        { selectingTime ?
          <Modal
            isOpen
            className="snutt__modal"
            overlayClassName="snutt__modal-overlay"
          >
            <TimeQuery />
          </Modal> :
          null
        }
        <SearchBar
          handleSearch={txt => this.composeQuery(txt)}
        />
        <SearchFilter
          on={filterOn}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);

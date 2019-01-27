import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getColor } from 'actions/fetchingActions';

import SampleTable from 'samples/sampleTable';
import Table from './Table';
import populateColor from 'utils/populateColor';

import 'stylesheets/timetable.scss';

const mapStateToProps = ({ tableList: { colorScheme } }) => ({
  colorScheme,
});

const mapDispatchToProps = dispatch => ({
  getColor: () => dispatch(getColor()),
});

class TableRenderer extends Component {
  componentDidMount = () => this.props.getColor();

  render() {
    console.log(this.props.colorScheme);
    const courses = SampleTable.lecture_list;
    const coloredCourses = populateColor(this.props.colorScheme, courses);
    console.log(coloredCourses);
    return (
      <div id="timetable-container">
        <Table courses={coloredCourses} />
      </div>
    );
  }
}

// export default TableRenderer;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TableRenderer);

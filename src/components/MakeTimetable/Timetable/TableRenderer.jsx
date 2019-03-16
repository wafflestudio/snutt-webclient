import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getColor } from '../../../actions/initializingActions';

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
  state = {
    table: false,
  };

  componentDidMount = () => {
    this.props.getColor();
    window.changeTable = tableString => {
      const table = JSON.parse(tableString);
      this.setState({
        table,
      });
    };
  };

  render() {
    console.log(this.props.colorScheme);
    const courses = this.state.table.lecture_list;
    if (!this.state.table) {
      console.log('no table');
      return <div />;
    }

    const coloredCourses = populateColor(this.props.colorScheme, courses);
    console.log(coloredCourses);
    return (
      <div id="timetable-container">
        {this.state.table && <Table courses={coloredCourses} />}
      </div>
    );
  }
}

// export default TableRenderer;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TableRenderer);

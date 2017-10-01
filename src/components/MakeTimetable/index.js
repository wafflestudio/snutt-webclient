import React, { Component } from 'react';
import { connect } from 'react-redux';

import CourseEditorLoader from './CourseEditor/Loader';
import ResultTable from './ResultTable';
import TimetableTabs from './Timetable/TimetableTabs.jsx';
import Timetable from './Timetable';

const mapStateToProps = ({ courseEditor }) => ({ courseEditorOpen: courseEditor.isOpen });

class MakeTimeTable extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    CourseEditorLoader().then((loaded) => {
      this.CourseEditor = loaded.CourseEditor.default;
      this.forceUpdate();
    });
  }

  render() {
    const { courseEditorOpen } = this.props;

    return (
      <div className="container">
        <div className="row body">
          <div className="col-lg-6 col-search">
            <ResultTable />
          </div>
          <div className="col-lg-6">
            <TimetableTabs />
            <Timetable />
          </div>
          { courseEditorOpen ? <this.CourseEditor /> : null }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(MakeTimeTable);

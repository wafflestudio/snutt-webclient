import React, { Component } from 'react';
import { connect } from 'react-redux';

import Search from './Search';
import CourseEditorLoader from './CourseEditor/Loader';
import ResultTable from './ResultTable';
import TimetableTabs from './Timetable/TimetableTabs.jsx';
import Timetable from './Timetable';

class MakeTimeTable extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    CourseEditorLoader().then((loaded) => {
      console.log('course editor loaded');
      this.CourseEditor = loaded.CourseEditor.default;
      this.forceUpdate();
    });
  }

  render() {
    const { courseEditorOpen } = this.props;

    return (
      <div className="container">
        <Search />
        <div className="row">
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

function mapStateToProps(state) {
  const { courseEditor } = state;
  
  return {
    courseEditorOpen: courseEditor.isOpen,
  };
}

export default connect(mapStateToProps)(MakeTimeTable);

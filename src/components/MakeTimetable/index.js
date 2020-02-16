import React, { Component } from 'react';
import { connect } from 'react-redux';

import populateColor from 'utils/populateColor'
import CourseEditorLoader from './CourseEditor/Loader';
import ResultTable from './ResultTable';
import TimetableTabs from './Timetable/TimetableTabs.jsx';
import Timetable from './Timetable';

const mapStateToProps = ({
  ui: {hoveredCourse: previewed},
  courseEditor,
  courseBook,
  tableList: { viewTableId, tableMap, colorScheme },
}) => {
  let semesterTables = [];
  const currentBook = courseBook.current;
  if (currentBook) {
    const { year, semester } = currentBook;
    semesterTables = Object.values(tableMap).filter(
      t => t.year === year && t.semester === semester,
    );
  }

  const viewTable = viewTableId && tableMap[viewTableId];
  const lecture_list = (viewTable && viewTable.lecture_list && populateColor(colorScheme, viewTable.lecture_list)) || []

  return {
    viewTableId,
    viewTable: {
      ...viewTable,
      lecture_list
    },
    tables: semesterTables,
    courseEditorOpen: courseEditor.isOpen,
    previewed
  };
};

class MakeTimeTable extends Component {
  componentWillMount() {
    CourseEditorLoader().then(loaded => {
      this.CourseEditor = loaded;
      this.forceUpdate();
    });
  }

  render() {
    const {
      courseEditorOpen,
      viewTableId,
      viewTable,
      tables,
      previewed,
    } = this.props;

    return (
      <div className="container">
        <div className="row body">
          <div className="col-lg-6 col-search">
            <ResultTable />
          </div>
          <div className="col-lg-6">
            <TimetableTabs viewTableId={viewTableId} tables={tables} />
            <Timetable
              viewTableId={viewTableId}
              previewed={previewed}
              viewTable={viewTable}
            />
          </div>
          {courseEditorOpen ? <this.CourseEditor /> : null}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(MakeTimeTable);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import CourseEditorLoader from './CourseEditor/Loader';
import ResultTable from './ResultTable';
import TimetableTabs from './Timetable/TimetableTabs.jsx';
import Timetable from './Timetable';

const mapStateToProps = ({
  hoveredCourse: previewed,
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
  if (viewTable && viewTable.lecture_list) {
    viewTable.lecture_list.forEach(lecture => {
      if (lecture.colorIndex && lecture.colorIndex < colorScheme.length) {
        lecture.color = colorScheme[lecture.colorIndex - 1];
      }
    });
  }

  return {
    viewTableId,
    viewTable,
    tables: semesterTables,
    courseEditorOpen: courseEditor.isOpen,
    previewed,
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

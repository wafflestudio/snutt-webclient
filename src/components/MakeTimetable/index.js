import React, { Component } from 'react';
import { connect } from 'react-redux';

import Search from './Search';
import CourseEditorLoader from './CourseEditor/Loader';
import ResultTable from './ResultTable';
import TimetableTabs from './Timetable/TimetableTabs.jsx';
import Timetable from './Timetable';

import { addCourse } from '../../actions';
import { createCourse, deleteLecture, updateTitle, createTable, switchTable, deleteTable,
  } from '../../actions/tableActions';

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
    const { dispatch, hoveredCourse, currentLectures, currentIndex, courseBook,
      courseEditorOpen } = this.props;

    return (
      <div className="container">
        <Search />
        <div className="row">
          <div className="col-lg-6 col-search">
            <ResultTable />
          </div>
          <div className="col-lg-6">
            <TimetableTabs />
            <Timetable
              currentIndex={currentIndex}
              courseBook={courseBook}
              courses={currentLectures}
              previewed={hoveredCourse}
              handleDelete={_id => dispatch(deleteLecture(_id))}
              addCourse={course => dispatch(addCourse(course))}
              openCourse={() => dispatch(createCourse())}
            />
          </div>
          { courseEditorOpen ? <this.CourseEditor /> : null }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { hoveredCourse, searchResults, courseBook, isQuerying,
    modalOn, tableList, courseEditor } = state;
  const { currentId, tableMap } = tableList;
  const currentLectures = currentId == null ? null : tableMap[currentId].lecture_list;
  return {
    hoveredCourse,
    searchResults,
    courseBook,
    isQuerying,
    modalOn,
    currentLectures,
    courseEditorOpen: courseEditor.isOpen,
  };
}

export default connect(mapStateToProps)(MakeTimeTable);

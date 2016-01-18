import React, { Component } from 'react';
import { connect } from 'react-redux'

import TopBar from './topbar.jsx'
import Footer from './footer.jsx'


class App extends Component {
  render() {
    const { selectedCourse, searchResults, timeTable, courseBook } = this.props;
    return <div>
      <TopBar courseBook={courseBook}/>
      {React.cloneElement(
        this.props.children,
        { selectedCourse, searchResults, timeTable, courseBook }
        )}
      <Footer />
    </div>
  }
}

function mapStateToProps(state) {
  const { selectedCourse, searchResults, timeTable, courseBook } = state
  return { selectedCourse, searchResults, timeTable, courseBook }
}

export default connect(mapStateToProps)(App)

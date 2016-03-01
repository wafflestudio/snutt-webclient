import React, { Component } from 'react';
import { connect } from 'react-redux'
import TopBar from './TopBar.jsx'
import Footer from './footer.jsx'

class App extends Component {
  render() {
    const { dispatch, selectedCourse, searchResults, timeTables, courseBook, isQuerying } = this.props;
    return <div>
      <TopBar courseBook={courseBook} dispatch={dispatch}/>
      {React.cloneElement(
        this.props.children,
        { dispatch, selectedCourse, searchResults, timeTables, courseBook, isQuerying }
        )}
      <Footer />
    </div>
  }
}

function mapStateToProps(state) {
  const { selectedCourse, searchResults, timeTables, courseBook, isQuerying } = state
  return { selectedCourse, searchResults, timeTables, courseBook, isQuerying }
}

export default connect(mapStateToProps)(App)

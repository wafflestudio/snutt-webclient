import React, { Component } from 'react'
import { connect } from 'react-redux'
import TopBar from './TopBar.jsx'
import Footer from './footer.jsx'

class App extends Component {
  render() {
    const { dispatch, courseBook } = this.props;
    return <div>
      <TopBar courseBook={courseBook} dispatch={dispatch}/>
        {this.props.children}
      <Footer />
    </div>
  }
}

function mapStateToProps(state) {
  const { courseBook } = state
  return { courseBook }
}

export default connect(mapStateToProps)(App)

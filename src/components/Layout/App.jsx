import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateCoursebook } from '../../actions/fetchingActions';
import Header from './Header';
import Footer from './footer.jsx';

class App extends Component {

  componentWillMount() {
    // Entry point for other loading actions
    this.props.dispatch(updateCoursebook());
  }

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default connect()(App);

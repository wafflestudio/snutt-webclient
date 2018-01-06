import React, { Component } from 'react';
import { connect } from 'react-redux';
import MobileDetect from 'mobile-detect';

import { updateCoursebook } from '../../actions/fetchingActions';
import Header from './Header';
import Footer from './footer.jsx';
import AppLink from './appLink.jsx';

class App extends Component {
  constructor() {
    super();
    const md = new MobileDetect(window.navigator.userAgent);
    const isMobile = Boolean(md.mobile());
    this.state = {
      showAppLink: isMobile,
    };
  }

  componentWillMount() {
    // Entry point for other loading actions
    this.props.dispatch(updateCoursebook());
  }

  closeModal = () => this.setState({ showAppLink: false })

  render() {
    const { showAppLink } = this.state;
    return (
      <div>
        {showAppLink &&
          <AppLink
            isOpen={showAppLink}
            close={this.closeModal}
          />}
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default connect()(App);

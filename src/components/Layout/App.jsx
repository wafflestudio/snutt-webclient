import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';

import MobileDetect from 'mobile-detect';

// import { updateCoursebook } from '../../actions/fetchingActions';
import { initialize } from '../../actions/loadingActions';

import Header from './Header';
import Footer from './footer.jsx';
import AppLink from './appLink.jsx';

Modal.setAppElement('#root');

class App extends Component {
  constructor() {
    super();
    const md = new MobileDetect(window.navigator.userAgent);
    const isMobile = Boolean(md.mobile());
    this.state = {
      showAppLink: isMobile,
    };
  }

  initialize = () => {
    this.props.dispatch(initialize());
  };

  componentDidMount() {
    // Entry point for other loading actions
    // this.props.dispatch(updateCoursebook());
    this.initialize();
  }

  closeModal = () => this.setState({ showAppLink: false });

  render() {
    const { showAppLink } = this.state;
    return (
      <div>
        {showAppLink && (
          <AppLink isOpen={showAppLink} close={this.closeModal} />
        )}
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect()(App));

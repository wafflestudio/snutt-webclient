// Modified code from
// https://github.com/joshgeller/react-redux-jwt-auth-example/blob/master/src/components/AuthenticatedComponent.js

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export default function MustLoggedIn(Component) {
  class AuthenticatedComponent extends React.Component {

    componentWillMount() {
      this.checkAuth(this.props.isAuthenticated);
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps.isAuthenticated);
    }

    checkAuth(isAuthenticated) {
      console.log(this.props);
      console.log(this.props.isAuthenticated);
      if (!isAuthenticated) { this.props.dispatch(push('/login')); }
    }

    render() {
      return (
        <div>
          {this.props.isAuthenticated === true
            ? <Component {...this.props} />
            : null
          }
        </div>
      );
    }
  }

  const mapStateToProps = state => ({
    isAuthenticated: state.user.loggedIn,
  });

  return connect(mapStateToProps)(AuthenticatedComponent);
}

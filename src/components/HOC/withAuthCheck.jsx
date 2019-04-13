import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

const withAuthCheck = (Component, needAuth = true) => props => {
  const { loggedIn, dispatch, ...rest } = props;
  useEffect(() => {
    if (loggedIn !== needAuth) {
      const redirectPath = needAuth ? '/login' : '/';
      dispatch(push(redirectPath));
    }
  });
  return <Component {...rest} />;
};

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
});

const connectedWithAuthCheck = compose(
  connect(mapStateToProps),
  withAuthCheck,
);

export default connectedWithAuthCheck;

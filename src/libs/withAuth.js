import React, { Component } from 'react'

import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';

const withAuth = WrappedComponent => {
  class AuthComponent extends Component {
      state = {}
      render() {
        const { user } = this.props;
        if (user && user.id && user.token) return <WrappedComponent {...this.props} />;
        return <Redirect to="/" />
      }
  }
  
  const mapStateToProps = state => ({
    user: state.auth.user,
  });

  return connect(mapStateToProps)(AuthComponent);
};

export default withAuth;

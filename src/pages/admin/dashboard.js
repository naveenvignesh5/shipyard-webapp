import React, { Component } from "react";
// import PropTypes from 'prop-types'

import { connect } from "react-redux";
import Navbar from "../../components/Navbar";

class Dashboard extends Component {
  state = {};
  render() {
    const { user } = this.props;
    return (
      <div className="container-fluid">
        <Navbar />
        <div className="main-container">
          <h3>Welcome Admin {user.username}</h3>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Dashboard);

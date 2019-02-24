import React, { Component } from "react";
// import PropTypes from "prop-types";

class Register extends Component {
  state = {};

  render() {
    return (
      <div className="container-fluid login-container">
        <div className="title">Register</div>
        <form className="form">
          <div className="form-group">
            <label htmlFor="email">Username</label>
            <input type="email" className="form-control" id="email" />
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password</label>
            <input type="password" className="form-control" id="pwd" />
          </div>
          <div className="form-group">
            <label htmlFor="confpwd">Confirm Password</label>
            <input type="password" className="form-control" id="confpwd" />
          </div>
          <div className="d-flex flex-row align-items-center">
            <button type="button" className="btn btn-primary mr-4">
              Register
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;

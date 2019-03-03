import React, { Component } from "react";
// import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { register } from "../redux/actions/action-auth";

class Register extends Component {
  state = {
    username: "",
    password: "",
    copyPassword: "",
    email: ""
  };

  handleRegister = () => {
    let { username, password, copyPassword, email } = this.state;

    username = username.trim() || "";
    password = password.trim() || "";
    copyPassword = copyPassword.trim() || "";
    email = email.trim() || "";

    if (username && password && copyPassword && email) {
      if (password === copyPassword) {
        this.props.register(username, password, email);
      } else alert("Passwords don't match");
    } else alert("Enter all values !!!");
  };

  handleTextChange = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className="container-fluid register-container">
        <div className="title">Register</div>
        <form className="form">
          <div className="form-group">
            <label htmlFor="name">Username</label>
            <input
              type="text"
              className="form-control"
              id="name"
              onChange={e => this.handleTextChange("username", e.target.value)}
            />
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              onChange={e => this.handleTextChange("email", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password</label>
            <input
              type="password"
              className="form-control"
              id="pwd"
              onChange={e => this.handleTextChange("password", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confpwd">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confpwd"
              onChange={e =>
                this.handleTextChange("copyPassword", e.target.value)
              }
            />
          </div>
          <div className="d-flex flex-row align-items-center">
            <button
              type="button"
              className="btn btn-primary mr-4"
              onClick={this.handleRegister}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isLoading: state.auth.isLoading,
  isError: state.auth.isError,
  error: state.auth.error
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ register }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

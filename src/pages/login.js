import React, { Component } from "react";

import { Link } from "react-router-dom";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { login } from "../redux/actions/action-auth";

import "../styles/login.css";

class Login extends Component {
  state = {
    username: "",
    password: "",
    type: "client"
  };

  handleLogin = () => {
    const { username = "", password = "", type="" } = this.state;
    if (username && password && type) {
      this.props.login(username, password, type);
    }
  };

  handleOnChangeText = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  handleRadioPress = (name, e) => {
    console.log(e.currentTarget.value);
    this.setState({
      [name]: e.currentTarget.value,
    });
  };

  render() {
    const { isLoading } = this.props;
    return (
      <div className="container-fluid login-container">
        <div className="title">Login</div>
        <form className="form">
          <div className="form-group">
            <label htmlFor="email">Username</label>
            <input
              type="email"
              className="form-control"
              id="email"
              onChange={e =>
                this.handleOnChangeText("username", e.target.value)
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password</label>
            <input
              type="password"
              className="form-control"
              id="pwd"
              onChange={e =>
                this.handleOnChangeText("password", e.target.value)
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">User Type</label>
            <div className="radio-wrapper">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="type"
                  id="radio1"
                  value="client"
                  defaultChecked
                  onChange={e => this.handleRadioPress("type", e)}
                />
                <label className="form-check-label" htmlFor="radio1">
                  Employee
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="type"
                  id="radio2"
                  value="speaker"
                  onChange={e => this.handleRadioPress("type", e)}
                />
                <label className="form-check-label" htmlFor="radio2">
                  Speaker
                </label>
              </div>
            </div>
          </div>
          {!isLoading ? (
            <div className="d-flex flex-row align-items-center">
              <button
                onClick={this.handleLogin}
                type="button"
                className="btn btn-primary mr-4"
              >
                Login
              </button>
              <Link to="/register">Register</Link>
            </div>
          ) : (
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isLoading: state.auth.isLoading,
  isError: state.auth.isError
});

const mapDispatchToProps = dispatch => bindActionCreators({ login }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

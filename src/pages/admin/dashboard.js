import React, { Component } from "react";
// import PropTypes from 'prop-types'

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Navbar from "../../components/Navbar";

import { logout } from "../../redux/actions/action-auth";
import {
  listCompletedRooms,
  listActiveRooms,
  createRoom
} from "../../redux/actions/action-session";

import "../../styles/dashboard.css";
import "../../styles/admin.css";

class Dashboard extends Component {
  static getDerivedStateFromProps = nextProps => {
    console.log(nextProps.roomsLive);
    return null;
  }
  state = {
    roomName: "",
    roomSize: 0,
  };

  componentDidMount() {
    this.props.listCompletedRooms();
    this.props.listActiveRooms();
  }

  handleOnMenuPress = (name, index) => {
    if (index === 0) this.props.logout();
  };

  handleTextChange = (name, e) => {
    this.setState({
      [name]: e.target.value
    });
  };

  handleCreateRoom = () => {
    const { roomSize, roomName } = this.state;

    if (!roomName) {
      alert('Room name cannot be empty')
      return;
    }

    if (!roomSize) {
      alert('Room size cannot be 0');
      return;
    }

    this.props.createRoom(roomName, roomSize);
  };

  render() {
    const { user, isLoading, roomsClosed, roomsLive } = this.props;

    return (
      <div className="container-fluid">
        <Navbar
          brand="Goa Shipyard Conference - Admin"
          menuItems={["Logout"]}
          onMenuPress={this.handleOnMenuPress}
        />
        <div className="admin-container">
          <div className="dashboard-welcome">
            Welcome <strong>{user.username}</strong>
          </div>
          <div className="row">
            <div className="col-md-6 col-sm-6">
              <form>
                <div className="title">Create Conference</div>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Room name</span>
                  </div>
                  <input
                    onChange={e => this.handleTextChange("roomName", e)}
                    type="text"
                    className="form-control"
                    placeholder=""
                  />
                </div>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      Number of people attending
                    </span>
                  </div>
                  <input
                    onChange={e => this.handleTextChange("roomSize", e)}
                    type="number"
                    className="form-control"
                    placeholder=""
                  />
                </div>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={this.handleCreateRoom}
                >
                  Create
                </button>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-sm-6">
              <div className="title">List of Active Conferences</div>
              {isLoading ? (
                <div className="spinner-border text-dark" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <div>
                  {roomsLive.length > 0 ? (
                    roomsLive.slice(0, 9).map((room, index) => (
                      <a
                        key={index.toString()}
                        href
                        className="list-group-item list-group-item-action"
                      >
                        {room.unique_name}
                      </a>
                    ))
                  ) : (
                    <div className="no-rooms">No Active Conferences</div>
                  )}
                </div>
              )}
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="title">List of Completed Conferences</div>
              {isLoading ? (
                <div className="spinner-border text-dark" role="status">
                  <span className="sr-only">Loading</span>
                </div>
              ) : (
                <div>
                  {roomsClosed.length > 0 ? (
                    roomsClosed.slice(0, 9).map((room, index) => (
                      <a
                        key={index.toString()}
                        href
                        className="list-group-item list-group-item-action"
                      >
                        {room.unique_name}
                      </a>
                    ))
                  ) : (
                    <div className="no-rooms">No History of conferences</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  roomsClosed: state.session.roomsClosed,
  roomsLive: state.session.roomsLive,
  isLoading: state.session.isLoading,
  isError: state.session.isError
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { logout, listCompletedRooms, listActiveRooms, createRoom },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

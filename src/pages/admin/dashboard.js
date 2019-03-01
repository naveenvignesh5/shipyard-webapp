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
import RoomList from "../../components/RoomList";

class Dashboard extends Component {
  state = {
    roomName: "",
    roomSize: 0
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
      alert("Room name cannot be empty");
      return;
    }

    if (!roomSize) {
      alert("Room size cannot be 0");
      return;
    }

    this.props.createRoom(roomName, roomSize, this.props.user);
  };

  // handleRoomListItemPress = room => {
  //   this.props.history.push();
  // };

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
              <RoomList
                loadingMessage="Loading Active Sessions..."
                isLoading={isLoading}
                rooms={roomsLive}
                nullMessage="No Active Conferences"
              />
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="title">List of Completed Conferences</div>
              <RoomList
                rooms={roomsClosed}
                loadingMessage="Loading Closed Conferences..."
                nullMessage="No History of Conferences"
                isLoading={isLoading}
              />
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

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
import axios from "axios";

class Dashboard extends Component {
  state = {
    roomName: "",
    roomSize: 0,
    selectedFile: null
  };

  componentDidMount() {
    this.props.listCompletedRooms();
    this.props.listActiveRooms();
  }

  handleSetupEvent = () => {
    const evtSource = new EventSource("/test/eventTest");
    evtSource.onmessage(e => {
      console.log(e);
    });
    evtSource.addEventListener("test_event", e => {
      console.log(e);
    });
  };

  handleOnMenuPress = (name, index) => {
    if (index === 0) this.props.logout();
  };

  handleTextChange = (name, e) => {
    this.setState({
      [name]: e.target.value
    });
  };

  handleCreateRoom = () => {
    const { roomName } = this.state;

    if (!roomName) {
      alert("Room name cannot be empty");
      return;
    }

    this.props.createRoom(roomName, this.props.user);
  };

  // handleRoomListItemPress = room => {
  //   this.props.history.push();
  // };

  handleFileSelect = e => {
    this.setState({
      selectedFile: e.target.files[0]
    });
  };

  handleFileUpload = async () => {
    const data = new FormData();
    data.append("file", this.state.selectedFile, this.state.selectedFile.name);

    try {
      const res = await axios.post("/tests/upload", data);
      this.setState({
        selectedFile: ""
      });
    } catch (err) {
      console.log(err);
    }
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
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={this.handleCreateRoom}
                >
                  Create
                </button>
              </form>
              <br />
              {/* <div className="title">Upload Your PPTs</div>
              <input
                type="file"
                name=""
                id=""
                onChange={this.handleFileSelect}
                value={this.state.selectedFile}
              />
              <button
                className="btn btn-primary"
                type="button"
                onClick={this.handleFileUpload}
              >
                Upload
              </button> */}
            </div>
            {/* <div className="row">
            <div className="col-md-6 col-sm-6">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">Employee Name</span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                />
              </div>
            </div> */}
          </div>
          <br />
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

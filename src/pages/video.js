import React, { Component } from "react";
import Video from "twilio-video";
import Chat from "twilio-chat";
import axios from "axios";

import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

import Navbar from "../components/Navbar";
// import { ChatContainer } from "../components/Chat";

import { getSession, endSession } from "../libs/sessions";
import { listFiles } from "../redux/actions/action-session";

import "../styles/video.css";

import { listMessages, sendMessage } from "../redux/actions/action-chat";
import { bindActionCreators } from "redux";
import Questions from "../components/Questions";
import QuestionForm from "../components/QuestionForm";
import FileList from "../components/FileList";

// const MESSAGES = [
//   {
//     sid: "IMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
//     account_sid: "AC0781fce904345bc1c4012a307bf86c4d",
//     service_sid: "ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
//     to: "CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
//     channel_sid: "CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
//     date_created: "2016-03-24T20:37:57Z",
//     date_updated: "2016-03-24T20:37:57Z",
//     last_updated_by: null,
//     was_edited: false,
//     from: "abc",
//     attributes: {},
//     body:
//       "Aliqua amet consectetur sint tempor consequat anim elit veniam. Fugiat et officia ullamco est. Officia ut eiusmod do qui nulla occaecat.",
//     index: 0,
//     type: "text",
//     media: null,
//     url:
//       "https://chat.twilio.com/v2/Services/ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Channels/CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/IMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
//   },
//   {
//     sid: "IMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
//     account_sid: "AC0781fce904345bc1c4012a307bf86c4d",
//     service_sid: "ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
//     to: "CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
//     channel_sid: "CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
//     date_created: "2016-03-24T20:37:57Z",
//     date_updated: "2016-03-24T20:37:57Z",
//     last_updated_by: null,
//     was_edited: false,
//     from: "system",
//     attributes: {},
//     body:
//       "Mollit minim Lorem ut pariatur sunt anim nulla ullamco occaecat. Incididunt pariatur minim adipisicing ut occaecat adipisicing laborum. Deserunt pariatur mollit esse ad officia ea Lorem id tempor. Anim incididunt consequat amet aute veniam irure sunt adipisicing esse nisi.",
//     index: 0,
//     type: "text",
//     media: null,
//     url:
//       "https://chat.twilio.com/v2/Services/ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Channels/CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/IMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
//   },
//   {
//     sid: "IMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
//     account_sid: "AC0781fce904345bc1c4012a307bf86c4d",
//     service_sid: "ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
//     to: "CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
//     channel_sid: "CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
//     date_created: "2016-03-24T20:37:57Z",
//     date_updated: "2016-03-24T20:37:57Z",
//     last_updated_by: null,
//     was_edited: false,
//     from: "abc",
//     attributes: {},
//     body:
//       "Do minim eu tempor fugiat eiusmod cillum. Ad qui cupidatat aliqua quis. Id minim pariatur est occaecat laborum tempor incididunt. Reprehenderit do amet aliquip aliqua voluptate fugiat ad proident nulla magna. Excepteur dolor laboris consequat culpa sunt laboris anim aliquip sint Lorem.",
//     index: 0,
//     type: "text",
//     media: null,
//     url:
//       "https://chat.twilio.com/v2/Services/ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Channels/CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/IMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
//   }
// ];

class VideoPage extends Component {
  static getDerivedStateFromProps = nextProps => {
    const { user, messages, files } = nextProps;
    if (user && user.token && user.username) {
      return {
        identity: user.username,
        token: user.token,
        messages: messages.length > 0 ? messages : [] // problem here
      };
    }

    console.log(files);
    return null;
  };

  state = {
    identity: null /* Will hold the fake name assigned to the client. The name is generated by faker on the server */,
    roomName: "" /* Will store the room name */,
    roomNameErr: false /* Track error for room name TextField. This will    enable us to show an error message when this variable is true */,
    previewTracks: null,
    localMediaAvailable: false /* Represents the availability of a LocalAudioTrack(microphone) and a LocalVideoTrack(camera) */,
    hasJoinedRoom: false,
    token: "",
    activeRoom: null, // Track the current active room
    activeChat: null, // Track the current chat
    currentMessage: "",
    messages: [],
    session: {},
    selectedFile: "",
    currentPdf: ""
  };

  componentDidMount() {
    this.loadSession(this.props.match.params.id);
  }

  handleOnTrackPress = track => {
    console.log(track);
  };

  loadSession = async id => {
    const session = await getSession(id);
    this.setState(
      {
        session
      },
      () => {
        this.initChat();
        this.props.listFiles(this.state.session.id);
      }
    );
  };

  handleJoinRoom = () => {
    if (this.state.session) {
      const { user } = this.props;
      this.setState(
        {
          roomName: this.state.session.id,
          identity: user.username
        },
        () => {
          this.joinRoom();
          this.props.listFiles(this.state.session.id);
          // this.initChat();
        }
      );
    }
  };

  joinRoom = () => {
    // if (!this.state.roomName.trim()) {
    //   this.setState({ roomNameErr: true });
    //   return;
    // }

    console.log("Joining room '" + this.state.roomName + "'...");
    let connectOptions = {
      name: this.state.roomName
    };

    if (this.state.previewTracks) {
      connectOptions.tracks = this.state.previewTracks;
    }

    // Join the Room with the token from the server and the
    // LocalParticipant's Tracks.
    Video.connect(this.state.token, connectOptions).then(
      this.roomJoined,
      error => {
        alert(error.message);
      }
    );
  };

  leaveRoom = () => {
    this.state.activeRoom.disconnect();
    this.setState({ hasJoinedRoom: false, localMediaAvailable: false });
  };

  localUserConnected = participant => {
    const div = document.createElement("div");
    div.className = "localUser";

    participant.on("trackSubscribed", track =>
      this.trackSubscribed(div, track)
    );
    participant.on("trackUnsubscribed", this.trackUnsubscribed);

    div.id = participant.sid;
    div.innerText = participant.identity;

    participant.tracks.forEach(publication => {
      if (publication.isSubscribed) {
        this.trackSubscribed(div, publication.track);
      }
    });

    this.localMedia.appendChild(div);
  };

  participantConnected = participant => {
    if (participant.identity === "admin") {
      const temp = document.createElement("div");
      temp.className = "admin-wrapper";
      this.adminMedia.appendChild(temp);

      participant.on("trackSubscribed", track =>
        this.trackSubscribed(temp, track)
      );
      participant.on("trackUnsubscribed", this.trackUnsubscribed);

      participant.tracks.forEach(publication => {
        if (publication.isSubscribed) {
          this.trackSubscribed(temp, publication.track);
        }
      });

      this.adminMedia.appendChild(temp);
    } else {
      console.log('Participant "%s" connected', participant.identity);

      const div = document.createElement("div");
      const textDiv = document.createElement("div");
      div.id = participant.sid;

      textDiv.innerText = participant.identity;
      textDiv.className = "username";

      div.append(textDiv);

      div.className = "track-wrapper";

      if (this.props.user.role === "admin") {
        const btn = document.createElement("button");
        btn.className = "btn btn-primary mute-btn";

        btn.innerText = "Mute";
        btn.onClick = this.handleOnTrackPress(participant);

        div.append(btn);
        participant.on("trackSubscribed", track =>
          this.trackSubscribed(div, track)
        );
        participant.on("trackUnsubscribed", this.trackUnsubscribed);
    
        participant.tracks.forEach(publication => {
          if (publication.isSubscribed) {
            this.trackSubscribed(div, publication.track);
          }
        });
    
        this.remoteMedia.appendChild(div);
      }
    }

  };

  participantDisconnected = participant => {
    console.log('Participant "%s" disconnected', participant.identity);
    document.getElementById(participant.sid).remove();
  };

  trackSubscribed = (div, track) => {
    div.onClick = this.handleOnTrackPress(track); // hope it works
    div.appendChild(track.attach());
  };

  trackUnsubscribed = track => {
    track.detach().forEach(element => element.remove());
  };

  roomJoined = room => {
    this.setState({
      activeRoom: room,
      localMediaAvailable: true,
      hasJoinedRoom: true
    });

    // this.props.listFiles();
    // Attach LocalParticipant's Tracks, if not already attached.
    // var previewContainer = this.localMedia;
    // if (!previewContainer.querySelector("video")) {
    //   this.attachParticipantTracks(room.localParticipant, previewContainer);
    // }

    const userDiv = document.createElement("div");

    const userTracks = Array.from(room.localParticipant.tracks.values());

    userTracks.forEach(track => {
      userDiv.appendChild(track.attach());
    });

    this.localMedia.appendChild(userDiv);
    // Attach the Tracks of the Room's Participants.
    room.participants.forEach(this.participantConnected);

    // When a Participant joins the Room, log the event.
    room.on("participantConnected", this.participantConnected);

    // When a Participant leaves the Room, detach its Tracks.
    room.on("participantDisconnected", this.participantDisconnected);

    room.once("disconnected", error =>
      room.participants.forEach(this.participantDisconnected)
    );
  };

  handleInputChange = (name, text) => {
    this.setState({
      [name]: text
    });
  };

  handleSendMessage = () => {
    const text = this.state.currentMessage.trim() || "";

    if (text) {
      this.state.activeChat.sendMessage(text, {
        author: this.props.user.username
      });

      this.setState({
        currentMessage: ""
      });
    }
  };

  // Code: Related to Chat
  initChat = async () => {
    try {
      const chatClient = await Chat.create(this.state.token);

      const channel = await chatClient.getChannelBySid(
        this.state.session.chatId
      );

      try {
        await channel.join(); // joining channel only when you are client
      } catch (err) {
        console.log(err);
      }
      // chat event callbacks

      this.props.listMessages(this.state.session.chatId);

      chatClient.on("channelJoined", channel => {
        console.log("Joined Channel" + channel.friendlyName);
      });

      // const { items: messages } = await channel.getMessages()

      // TODO: Major area to worked upon
      // // channel callbacks
      channel.on("messageAdded", message => {
        console.log("Added", message);
        this.props.listMessages(this.state.session.chatId);
      });

      this.setState(
        {
          activeChat: channel // tracking the channel in state
        },
        () => {
          console.log("update channel");
        }
      );
      // chat event callbacks
    } catch (err) {
      console.log("Chat error", err);
    }
  };

  handleMenuPress = async (item, index) => {
    console.log(item, index);
    if (index === 0) {
      try {
        if (this.props.user.role === "admin")
          await endSession(this.state.session.id);
        if (this.state.hasJoinedRoom) this.leaveRoom();
        this.props.history.goBack();
      } catch (err) {
        console.log("End session error", err);
      }
    }
  };

  handleFileSelect = e => {
    this.setState({
      selectedFile: e.target.files[0]
    });
  };

  handleFileUpload = async () => {
    const data = new FormData();
    data.append("file", this.state.selectedFile, this.state.selectedFile.name);
    data.append("sessionId", this.state.session.id);

    try {
      await axios.post("/session/upload", data);
      this.props.listFiles(this.state.session.id);
      alert("Uploaded File");
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { hasJoinedRoom, messages } = this.state;
    const { user, isLoading, files } = this.props;

    return (
      <div className="container-fluid">
        <Navbar
          menuItems={[user.type === "client" ? "Exit Session" : "End Session"]}
          onMenuPress={this.handleMenuPress}
        />
        <div className="video-dashboard">
          {!hasJoinedRoom ? (
            <button
              type="button"
              className="join-btn btn btn-primary"
              onClick={this.handleJoinRoom}
            >
              Join Room
            </button>
          ) : (
            <div className="d-flex flex-row">
              <div className="admin-wrapper" ref={e => (this.adminMedia = e)} />
              <div className={`d-flex flex-${this.props.user.role === 'admin' ? 'row' : 'column'} align-items-center`}>
                <div
                  className="d-flex flex-row"
                  ref={e => (this.remoteMedia = e)}
                  id="remote-media"
                />
              </div>
            </div>
          )}
          <br />
          <div className="row">
            <div className="col-sm-6 col-md-6">
              <Questions messages={messages} />
            </div>
            <div className="col-sm-6 col-md-6">
              <div className="localUser" ref={e => (this.localMedia = e)} />
              {this.props.user.role === "client" ? (
                <div>
                  <QuestionForm
                    handleInputChange={text =>
                      this.handleInputChange("currentMessage", text)
                    }
                    handleSendMessage={this.handleSendMessage}
                    isLoading={isLoading}
                  />
                  <div className="d-flex flex-row mb-2">
                    <button
                      type="button"
                      className="btn btn-info mr-2"
                      onClick={() => this.setState({ currentPdf: "" })}
                      // onClick={() => this.props.listFiles(this.state.session.id)}
                    >
                      <span className="glyphicon glyphicon-search" />
                      Clear
                    </button>
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={() =>
                        this.props.listFiles(this.state.session.id)
                      }
                    >
                      Sync Files
                    </button>
                  </div>
                  <FileList
                    handleListItemPress={path => {
                      console.log(path);
                      this.setState({ currentPdf: path }, () =>
                        console.log(this.state.currentPdf)
                      );
                    }}
                    currentFile={this.state.currentPdf}
                    files={files}
                    sessionId={this.state.session.id}
                  />
                </div>
              ) : (
                <div>
                  <div className="title">Upload Your PDFs</div>
                  <input
                    type="file"
                    name=""
                    accept=".pptx, .pptm, .ppt"
                    id=""
                    onChange={this.handleFileSelect}
                  />
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={this.handleFileUpload}
                  >
                    Upload
                  </button>
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
  messages: state.chat.messages,
  isLoading: state.chat.isLoading,
  files: state.session.files
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ listMessages, sendMessage, listFiles }, dispatch);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(VideoPage)
);

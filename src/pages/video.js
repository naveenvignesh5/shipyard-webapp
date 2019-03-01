import React, { Component } from "react";
import Video from "twilio-video";
import Chat from "twilio-chat";

import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

import Navbar from "../components/Navbar";
import { ChatContainer } from "../components/Chat";

import { getSession } from "../libs/sessions";

import "../styles/video.css";

const MESSAGES = [
  {
    sid: "IMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    account_sid: "AC0781fce904345bc1c4012a307bf86c4d",
    service_sid: "ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    to: "CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    channel_sid: "CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    date_created: "2016-03-24T20:37:57Z",
    date_updated: "2016-03-24T20:37:57Z",
    last_updated_by: null,
    was_edited: false,
    from: "abc",
    attributes: {},
    body:
      "Aliqua amet consectetur sint tempor consequat anim elit veniam. Fugiat et officia ullamco est. Officia ut eiusmod do qui nulla occaecat.",
    index: 0,
    type: "text",
    media: null,
    url:
      "https://chat.twilio.com/v2/Services/ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Channels/CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/IMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  },
  {
    sid: "IMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    account_sid: "AC0781fce904345bc1c4012a307bf86c4d",
    service_sid: "ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    to: "CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    channel_sid: "CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    date_created: "2016-03-24T20:37:57Z",
    date_updated: "2016-03-24T20:37:57Z",
    last_updated_by: null,
    was_edited: false,
    from: "system",
    attributes: {},
    body:
      "Mollit minim Lorem ut pariatur sunt anim nulla ullamco occaecat. Incididunt pariatur minim adipisicing ut occaecat adipisicing laborum. Deserunt pariatur mollit esse ad officia ea Lorem id tempor. Anim incididunt consequat amet aute veniam irure sunt adipisicing esse nisi.",
    index: 0,
    type: "text",
    media: null,
    url:
      "https://chat.twilio.com/v2/Services/ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Channels/CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/IMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  },
  {
    sid: "IMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    account_sid: "AC0781fce904345bc1c4012a307bf86c4d",
    service_sid: "ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    to: "CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    channel_sid: "CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    date_created: "2016-03-24T20:37:57Z",
    date_updated: "2016-03-24T20:37:57Z",
    last_updated_by: null,
    was_edited: false,
    from: "abc",
    attributes: {},
    body:
      "Do minim eu tempor fugiat eiusmod cillum. Ad qui cupidatat aliqua quis. Id minim pariatur est occaecat laborum tempor incididunt. Reprehenderit do amet aliquip aliqua voluptate fugiat ad proident nulla magna. Excepteur dolor laboris consequat culpa sunt laboris anim aliquip sint Lorem.",
    index: 0,
    type: "text",
    media: null,
    url:
      "https://chat.twilio.com/v2/Services/ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Channels/CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/IMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  }
];

class VideoPage extends Component {
  static getDerivedStateFromProps = nextProps => {
    const { user } = nextProps;
    if (user && user.token && user.username) {
      return {
        identity: user.username,
        token: user.token
      };
    }
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
    messages: [],
    currentMessage: '',
    session: {}
  };

  componentDidMount() {
    this.loadSession(this.props.match.params.id);
  }

  loadSession = async id => {
    const session = await getSession(id);
    this.setState(
      {
        session
      },
      () => {
        this.initChat();
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
          // this.initChat();
        }
      );
    }
  };

  joinRoom = () => {
    if (!this.state.roomName.trim()) {
      this.setState({ roomNameErr: true });
      return;
    }

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
        console.log(error);
        alert("Could not connect to Twilio: " + error.message);
      }
    );
  };

  attachTracks = (tracks, container) => {
    tracks.forEach(track => {
      container.appendChild(track.attach());
    });
  };

  // Attaches a track to a specified DOM container
  attachParticipantTracks = (participant, container) => {
    const tracks = Array.from(participant.tracks.values());
    this.attachTracks(tracks, container);
  };

  detachTracks = tracks => {
    tracks.forEach(track => {
      track.detach().forEach(detachedElement => {
        detachedElement.remove();
      });
    });
  };

  detachParticipantTracks = participant => {
    const tracks = Array.from(participant.tracks.values());
    this.detachTracks(tracks);
  };

  leaveRoom = () => {
    this.state.activeRoom.disconnect();
    this.setState({ hasJoinedRoom: false, localMediaAvailable: false });
  };

  roomJoined = room => {
    // Called when a participant joins a room
    console.log("Joined as '" + this.state.identity + "'");
    this.setState({
      activeRoom: room,
      localMediaAvailable: true,
      hasJoinedRoom: true
    });

    // Attach LocalParticipant's Tracks, if not already attached.
    var previewContainer = this.localMedia;
    if (!previewContainer.querySelector("video")) {
      this.attachParticipantTracks(room.localParticipant, previewContainer);
    }

    // Attach the Tracks of the Room's Participants.
    room.participants.forEach(participant => {
      console.log("Already in Room: '" + participant.identity + "'");
      previewContainer = this.remoteMedia;
      this.attachParticipantTracks(participant, previewContainer);
    });

    // When a Participant joins the Room, log the event.
    room.on("participantConnected", participant => {
      console.log("Joining: '" + participant.identity + "'");
    });

    // When a Participant adds a Track, attach it to the DOM.
    room.on("trackSubscribed", (track, participant) => {
      console.log(participant.identity + " added track: " + track.kind);
      var previewContainer = this.remoteMedia;
      this.attachTracks([track], previewContainer);
    });

    // When a Participant removes a Track, detach it from the DOM.
    room.on("trackUnsubscribed", (track, participant) => {
      this.log(participant.identity + " removed track: " + track.kind);
      this.detachTracks([track]);
    });

    // When a Participant leaves the Room, detach its Tracks.
    room.on("participantDisconnected", participant => {
      console.log("Participant '" + participant.identity + "' left the room");
      this.detachParticipantTracks(participant);
    });

    // Once the LocalParticipant leaves the room, detach the Tracks
    // of all Participants, including that of the LocalParticipant.
    room.on("disconnected", () => {
      if (this.state.previewTracks) {
        this.state.previewTracks.forEach(track => {
          track.stop();
        });
      }
      this.detachParticipantTracks(room.localParticipant);
      room.participants.forEach(this.detachParticipantTracks);
      this.setState({
        activeRoom: null,
        hasJoinedRoom: false,
        localMediaAvailable: false
      });
    });

    // Once the room is completed
    room.on("room-ended", () => {
      this.props.history.goBack();
    });
  };

  handleInputChange = (e) => {
    this.setState({
      currentMessage: e.target.value,
    });
  }

  handleSendMessage = () => {
    const text = this.state.currentMessage.trim() || "";
    this.state.activeChat.sendMessage(text);
  }

  initChat = async () => {
    try {
      const chatClient = await Chat.create(this.state.token);
  
      const channel = await chatClient.getChannelBySid(this.state.session.chatId);
      await channel.join(); // joining channel
      // this.setState({
      //   activeChat: channel, // tracking the channel in state
      // }, async () => {
      // });
      // // chat event callbacks
      // chatClient.on('channelJoined', (channel) => {
      //   console.log('Joined Channel' + channel.friendlyName);
      // });
      
      // const { items: messages } = await channel.getMessages()

      // // channel callbacks
      // channel.on('messageAdded', (message) => {
      //   this.setState(prevState => ({
      //     messages: prevState.messages.concat(message),
      //   }));
      // });

    } catch (err) {
      console.log('Chat error', err);
    }
  };

  render() {
    const { hasJoinedRoom } = this.state;
    const { user } = this.props;

    return (
      <div className="container-fluid">
        <Navbar
          menuItems={[user.type === "client" ? "Exit Session" : "End Session"]}
        />
        <div className="video-dashboard">
          <div className="row">
            <div className="col-sm-9 col-md-9">
              {hasJoinedRoom ? (
                <div>
                  <div
                    className="flex-item"
                    ref={e => (this.localMedia = e)}
                    id="local-media"
                  />
                  <div
                    className="flex-item"
                    ref={e => (this.remoteMedia = e)}
                    id="remote-media"
                  />
                </div>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.handleJoinRoom}
                >
                  Join Room
                </button>
              )}
            </div>
            <div className="col-sm-3 col-md-3">
              <ChatContainer
                messages={this.state.messages}
                // messages={MESSAGES}
                onInputChange={this.handleInputChange}
                onButtonPress={this.handleSendMessage}
                chatEnded={false}
                user={{ username: "abc" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default withRouter(connect(mapStateToProps)(VideoPage));

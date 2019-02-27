import React, { Component } from "react";
import PropTypes from "prop-types";

// Styles
import "../../styles/chat.css";

// Components
import ChatBubble from "./Bubble";
import ChatInput from "./Input";

class ChatContainer extends Component {
  state = {};

  render() {
    const {
      messages = [],
      onInputChange,
      onButtonPress,
      chatEnded,
      user,
    } = this.props;

    const chatArea =
      messages.length > 0 ? (
        messages.map((item, index) => (
          <ChatBubble user={user} key={index.toString()} {...item} />
        ))
      ) : (
        <div className="default">Not Messages yet</div>
      );

    return (
      <div className="chat-wrapper d-flex flex-column">
        <div className="content-inner">
          <div className="chat-item-container">
            {chatArea}
            {/* <div
              ref={e => {
                this.canvas = e;
              }}
            /> */}
            {chatEnded && <div className="default">Chat has ended</div>}
          </div>
        </div>
        <ChatInput
          placeholder="Enter a message"
          onInputChange={onInputChange}
          onButtonPress={onButtonPress}
        />
      </div>
    );
  }
}

ChatContainer.propTypes = {
  messages: PropTypes.array.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onButtonPress: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  chatEnded: PropTypes.bool
};

ChatContainer.defaultProps = {
  chatEnded: false
};

export default ChatContainer;

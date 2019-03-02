import React from "react";
import PropTypes from "prop-types";

import "../../styles/chat.css";

const ChatBubble = props => {
  const { body, date_updated, from, author, user } = props;
  return (
    <div
      className={`chat-bubble align-self-${
        from === user.username ? "end" : "start"
      }`}
    >
      {from !== user.username && <p className="chat-bubble username">{from || author}</p>}
      <p className="text">{body}</p>
      {from !== user.username && <p className="timestamp">{date_updated}</p>}
    </div>
  );
};

ChatBubble.propTypes = {
  body: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  date_updated: PropTypes.string
};

ChatBubble.defaultProps = {
  date_updated: ""
};

export default ChatBubble;

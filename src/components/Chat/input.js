import React from "react";
import PropTypes from "prop-types";

import "../../styles/chat.css";

const ChatInput = props => {
  const { placeholder, onInputChange, onButtonPress } = props;
  return (
    <div className="d-flex flex-row chat-input-container align-items-center">
      <textarea
        onChange={onInputChange}
        className="input"
        placeholder={placeholder}
      />
      <button
        onClick={onButtonPress}
        className="btn btn-secondary d-flex flex-row align-items-center"
        type="button"
      >
        <div className="icon">Send</div>
      </button>
    </div>
  );
};

ChatInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onButtonPress: PropTypes.func.isRequired,
};

ChatInput.defaultProps = {
  buttonText: ""
};

export default ChatInput;

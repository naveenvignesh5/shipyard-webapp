import React, { PureComponent } from "react";
// import PropTypes from "prop-types";

class QuestionForm extends PureComponent {
  state = {};
  render() {
    const { handleInputChange, handleSendMessage, currentMessage } = this.props;

    return (
      <form className="d-flex flex-column">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              Your Question
            </span>
          </div>
          <textarea
            type="text"
            value={currentMessage}
            className="form-control"
            placeholder="type your question"
            aria-label="question"
            aria-describedby="basic-addon1"
            onChange={e => handleInputChange(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary ask-btn"
          onClick={handleSendMessage}
        >
          Ask
        </button>
      </form>
    );
  }
}

export default QuestionForm;

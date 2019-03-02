import React, { PureComponent } from "react";
// import PropTypes from "prop-types";

import '../styles/question.css';

class Questions extends PureComponent {
  state = {};
  render() {
    const { messages, isLoading } = this.props;

    return (
      <div className="container-fluid question-container">
        {isLoading ? (
          <div className="d-flex flex-column align-items-center">
            Loading...
            <div className="spinner-border" role="status">
            </div>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Asked By</th>
                <th scope="col">Question</th>
              </tr>
            </thead>
            <tbody>
              {messages.length > 0 &&
                messages.map((message, index) => (
                  <tr key={index.toString()}>
                    <td>{index + 1}</td>
                    <td>{message.author || message.from}</td>
                    <td>{message.body}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default Questions;

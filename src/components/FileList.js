import React, { PureComponent } from "react";

import "../styles/list.css";

class FileList extends PureComponent {
  state = {}

  render() {
    const { files, sessionId, currentFile, handleListItemPress } = this.props;
    return (
      <div className="container-fluid">
        <ul className="list-group list-group-flush">
          {files.map(file => (
            <button
              className="list-group-item"
              onClick={() => handleListItemPress(`/files/${sessionId}/${file}`)}
            >
              {file}
            </button>
          ))}
          <br />
          {currentFile && (
            <embed
              className="embed-pdf"
              src={`${currentFile}#toolbar=0`}
              width="500px"
              height="300px"
            />
          )}
        </ul>
      </div>
    );
  }
}

export default FileList;

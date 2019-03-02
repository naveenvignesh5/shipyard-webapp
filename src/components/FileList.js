import React, { PureComponent } from "react";

class FileList extends PureComponent {
  state = {};
  render() {
    const { files, sessionId } = this.props;
    return (
      <div className="container-fluid">
        <ul className="list-group list-group-flush">
          {files.map(file => (
            <a href={`/files/${sessionId}/${file}`}>{file}</a>
          ))}
        </ul>
      </div>
    );
  }
}

export default FileList;

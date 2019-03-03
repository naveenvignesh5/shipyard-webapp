import React, { PureComponent } from "react";

class Recordings extends PureComponent {
  state = {};
  render() {
    const { recordings } = this.props;
    return (
      <div className="container-fluid">
        <ul className="list-group">
          {recordings.map(rec => (
            <a className="list-group-item" href={rec.links.media}>
              {rec.links.media}
            </a>
          ))}
        </ul>
      </div>
    );
  }
}

export default Recordings;

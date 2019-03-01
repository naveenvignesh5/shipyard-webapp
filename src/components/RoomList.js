import React, { PureComponent } from "react";

import { Link } from 'react-router-dom';

class RoomList extends PureComponent {
  state = {};
  render() {
    const {
      loadingMessage,
      isLoading,
      rooms,
      nullMessage,
    } = this.props;

    return (
      <div>
        {isLoading ? (
          <div className="spinner-border text-dark" role="status">
            <span className="sr-only">{loadingMessage}</span>
          </div>
        ) : (
          <div>
            <div className="list-group">
              {rooms.length > 0 ? (
                rooms.slice(0, 9).map((room, index) => (
                  <Link
                    type="button"
                    key={index.toString()}
                    to={`/video/${room.id}`}
                    className="list-group-item list-group-item-action"
                  >
                    {room.name}
                  </Link>
                ))
              ) : (
                <div className="no-rooms">{nullMessage}</div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default RoomList;

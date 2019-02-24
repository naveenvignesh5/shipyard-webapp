import React, { PureComponent } from "react";

class Navbar extends PureComponent {
  state = {}

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="navbar-brand">Goa Shipyard</div>
      </nav>
    );
  }
}

export default Navbar;

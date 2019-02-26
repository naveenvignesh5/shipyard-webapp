import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import "../styles/navbar.css";

class Navbar extends PureComponent {
  state = {};

  static propTypes = {
    brand: PropTypes.any,
    menuItems: PropTypes.array,
    onMenuPress: PropTypes.func
  };

  static defaultProps = {
    brand: "Goa Shipyard",
    menuItems: [],
    onMenuPress: () => {}
  };

  render() {
    const { brand, menuItems, onMenuPress } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="navbar-brand">{brand}</div>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {menuItems.map((item, index) => (
              <li
                key={index.toString()}
                className="nav-item active"
                onClick={() => onMenuPress(item, index)}
              >
                <button
                  className="btn nav-btn"
                  onClick={() => onMenuPress(item, index)}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;

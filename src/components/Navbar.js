import React, { PureComponent } from "react";
import PropTypes from 'prop-types';

class Navbar extends PureComponent {
  state = {}

  static propTypes = {
    brand: PropTypes.any,
  }

  static defaultProps = {
    brand: "Goa Shipyard"
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="navbar-brand">{this.props.brand}</div>
      </nav>
    );
  }
}

export default Navbar;

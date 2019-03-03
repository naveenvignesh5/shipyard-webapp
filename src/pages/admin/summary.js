import React, { Component } from "react";
import Navbar from "../../components/Navbar";

import { withRouter } from 'react-router-dom';

class Summary extends Component {
  state = {};

  componentDidMount() {
    console.log(this.props.match);  
  }

  render() {
    return (
      <div className="container-fluid">
        <Navbar />
        <div className="">Summary Screen</div>
        <div className=""></div>
      </div>
    );
  }
}

export default withRouter(Summary);

import React, { Component } from "react";
import Navbar from "../../components/Navbar";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";
import Recordings from "../../components/Recordings";

import { listRecordings } from "../../redux/actions/action-session";

class Summary extends Component {
  state = {};

  componentDidMount() {
    console.log(this.props.match);
  }

  render() {
    const { isLoading, recordings } = this.props;
    return (
      <div className="container-fluid">
        <Navbar />
        <div className="">Summary Screen</div>
        <div className="row">
          {isLoading ? (
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <Recordings recordings={recordings} />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.recording.isLoading,
  isError: state.recording.isError,
  recordings: state.recording.recordings
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      listRecordings
    },
    dispatch
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Summary)
);

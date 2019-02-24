import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import Navbar from '../components/Navbar';

class home extends Component {
    state = {}

    render() {
        const { user } = this.props;

        return (
          <div className="container-fluid">
            <Navbar />
            <h1>Welcome {user.username}</h1>
          </div>       
        );
    }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(home);

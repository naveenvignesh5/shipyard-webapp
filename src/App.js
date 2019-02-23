import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    message: '',
  }
  
  testApiCall = async () => {
    try {
      const res = await axios.get('/tests');
      console.log(res);
      this.setState({
        message: res.data.message,
      });
    } catch (e) {
      this.setState({
        message: 'Something wrong',
      });
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>Shipyard App Boilerplate</div><br />
          <button type="button" onClick={this.testApiCall}>Test</button><br />
          <p>{this.state.message}</p>
        </header>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleLogin from 'react-google-login';
import { Button } from 'antd';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.responseGoogle = this.responseGoogle.bind(this);
  }


   responseGoogle(e) {
      this.setState({user: e.profileObj.givenName})
      console.log(e);
    };

  renderLogin() {
    if (this.state.user) {
      return (<span> Logged in: {this.state.user}</span>)
    } else {
      return (
        <GoogleLogin
          className="ant-btn ant-btn-primary"
          clientId={'658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com'}
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          offline={false} />
      );
    }
  }

  render() {
    return (
      <div className="App">
        {this.renderLogin()}
      </div>
    );
  }
}

export default App;

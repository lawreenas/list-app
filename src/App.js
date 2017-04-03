import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import GoogleLogin from 'react-google-login';
import BookList from './containers/BookList';
import { fetchUser, registerUser } from './api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem('user') || null)
    };
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  onLogin(e) {
    const googleProfile = e.profileObj;
    fetchUser(googleProfile.googleId).then((user) => {
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        registerUser(googleProfile).then((user) => {
          this.setState({ user });
          localStorage.setItem('user', JSON.stringify(user));
        })
      }
    });
  };

  onLogout() {
    this.setState({ user: null });
    localStorage.setItem('user', null);
  }

  renderLogin() {
    if (this.state.user) {
      return (
        <div>
          <span>Logged in: {this.state.user.name}</span>&nbsp;
          <Button shape="circle" icon="logout" onClick={this.onLogout} />
        </div>
      );
    } else {
      return (
        <GoogleLogin
          className="ant-btn ant-btn-primary"
          clientId={'658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com'}
          onSuccess={this.onLogin}
          onFailure={this.onLogin}
          offline={false} />
      );
    }
  }

  render() {
    const {user} = this.state;
    return (
      <div className="App">
        <Row>
          <Col xs={{span: 24}} lg={{ span: 16, offset: 4 }}>
            <Row type="flex" justify="end">
              {this.renderLogin()}
            </Row>
            <Row>
              <BookList user={user}/>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;

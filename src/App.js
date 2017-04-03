import React, { Component } from 'react';
import { Row, Col } from 'antd';
import GoogleLogin from 'react-google-login';
import BookList from './containers/BookList';
import { fetchUser, registerUser } from './api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  responseGoogle(e) {
    const googleProfile = e.profileObj;

    fetchUser(googleProfile.googleId).then((user) => {
      console.log('user', user);
      if (user) {
        this.setState({ user });
      } else {
        // Register
        registerUser(googleProfile).then((user) => {
          this.setState({ user });
        })
      }
    });

  };

  renderLogin() {
    if (this.state.user) {
      return (
        <span>Logged in: {this.state.user.name}</span>
      );
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
    const {user} = this.state;
    return (
      <div className="App">
        <Row>
          <Col xs={{span: 24}} lg={{ span: 16, offset: 4 }}>
            <Row type="flex" justify="end">
              {this.renderLogin()}
            </Row>
            <Row>
              <BookList />
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;

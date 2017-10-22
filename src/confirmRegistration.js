import {CognitoUser} from "amazon-cognito-identity-js";

import React from "react";

export class ConfirmRegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      verificationCode: ''
    };
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handleVerificationCodeChange(e) {
    this.setState({verificationCode: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const userPool = this.props.userPool;
    const username = this.state.username.trim();
    const verificationCode = this.state.verificationCode.trim();

    var userData = {
      Username: username,
      Pool: userPool
    };
    var cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(verificationCode, true, function(err, result) {
      if (err) {
        alert(err);
        return;
      }
      alert('call result: ' + result);
    });
  }

  handleResendCode(e) {
    e.preventDefault();
    const userPool = this.props.userPool;
    const username = this.state.username.trim();

    var userData = {
      Username: username,
      Pool: userPool
    };
    var cognitoUser = new CognitoUser(userData);
    cognitoUser.resendConfirmationCode(function(err, result) {
      if (err) {
        alert(err);
        return;
      }
      alert('call result: ' + result);
    });
  }

  render() {
    return (
      <div>
        <h1>Confirm registration</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text"
                value={this.state.username}
                placeholder="Username"
                onChange={this.handleUsernameChange.bind(this)}/><br/>
          <input type="text"
                value={this.state.verificationCode}
                placeholder="Verification code"
                onChange={this.handleVerificationCodeChange.bind(this)}/><br/>
          <input type="submit" value="Confrim registration"/>
        </form>
        <form onSubmit={this.handleResendCode.bind(this)}>
          <input type="submit" value="Request new verification code"/>
        </form>
      </div>
    );
  }
}

module.exports = ConfirmRegistrationForm;

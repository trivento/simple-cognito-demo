import {CognitoUser} from "amazon-cognito-identity-js";

import React from "react";

export class ForgotPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      verificationCode: '',
      newPassword: '',
      showContinuationForm: false
    };
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handleNewPasswordChange(e) {
    this.setState({newPassword: e.target.value});
  }

  handleVerificationCodeChange(e) {
    this.setState({verificationCode: e.target.value});
  }

  handlePasswordForgotten(e) {
    e.preventDefault();
    const userPool = this.props.userPool;
    const username = this.state.username.trim();

    var userData = {
      Username: username,
      Pool: userPool
    };
    var cognitoUser = new CognitoUser(userData);
    cognitoUser.forgotPassword({
      onSuccess: function() {
        this.setState({showContinuationForm: true})
      }.bind(this),
      onFailure: function(err) {
        alert(err);
      },
      //Optional automatic callback
    });
  }

  handleContinuationForm(e) {
    e.preventDefault();
    const userPool = this.props.userPool;
    const username = this.state.username.trim();
    const verificationCode = this.state.verificationCode.trim();
    const newPassword = this.state.newPassword.trim();

    var userData = {
      Username: username,
      Pool: userPool
    };
    var cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmPassword(verificationCode, newPassword, this);
    alert("Password changed successfully")
  }

  render() {
    if (!this.state.showContinuationForm) {
      return (
        <div>
          <h1>Password forgotten?</h1>
          <form onSubmit={this.handlePasswordForgotten.bind(this)}>
            <input type="text" value={this.state.username} placeholder="Username" onChange={this.handleUsernameChange.bind(this)}/><br/>
            <input type="submit" value="Password forgotten?"/>
          </form>
        </div>
      );
    } else
      return (
        <div >
          <h1>Supply new password</h1>
          <form onSubmit={this.handleContinuationForm.bind(this)}>
            <input type="text" value={this.state.verificationCode} placeholder="Verification code" onChange={this.handleVerificationCodeChange.bind(this)}/><br/>
            <input type="password" value={this.state.newPassword} placeholder="New password" onChange={this.handleNewPasswordChange.bind(this)}/><br/>
            <input type="submit" value="New password"/>
          </form>
        </div>
      );
    }
  }

module.exports = ForgotPasswordForm;

import {CognitoUser, AuthenticationDetails} from "amazon-cognito-identity-js";


import React from "react";

export class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      tokens: null
    };
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const userPool = this.props.userPool;
    const username = this.state.username.trim();
    const password = this.state.password.trim();

      var authenticationData = {
          Username : username,
          Password : password
      };
      var userData = {
          Username : username,
          Pool : userPool
      };

      var authenticationDetails = new AuthenticationDetails(authenticationData);

      var cognitoUser = new CognitoUser(userData);
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function(result) {
          this.setState({
            tokens:  {
              AccessToken: result.getAccessToken().getJwtToken(),
              IdToken: result.getIdToken().getJwtToken()
            }
          })
        }.bind(this),

        onFailure: function(err) {
          alert(err);
        },
        mfaRequired: function(codeDeliveryDetails) {
          var verificationCode = prompt('Please input verification code', '');
          cognitoUser.sendMFACode(verificationCode, this);
        },
        newPasswordRequired: function(userAttributes, requiredAttributes) {
          var newPassword = prompt('Please supply a new password', '');
          // the api doesn't accept this field back
          delete userAttributes.email_verified;
          cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, this);
        }
    });
  }
  renderTokens() {
    function decodeToken(token){
      return (atob(token.split('.')[1])).replace(/,/g,',<br/>');
    }
    if (this.state.tokens) {
      return (
        <div>
          <h2>You are logged in!</h2>
          <h4>Access token</h4>
          <p dangerouslySetInnerHTML={{__html: decodeToken(this.state.tokens.AccessToken)}}></p>
          <h4>Identity token</h4>
          <p dangerouslySetInnerHTML={{__html: decodeToken(this.state.tokens.IdToken)}}></p>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <h1>Sign in now</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
           <input type="text"
                  value={this.state.username}
                  placeholder="Username"
                  onChange={this.handleUsernameChange.bind(this)}/><br/>
          <input type="password"
                 value={this.state.password}
                 placeholder="Password"
                 onChange={this.handlePasswordChange.bind(this)}/><br/>
          <input type="submit" value="Sign in"/>
        </form>
        {this.renderTokens()}
      </div>
    );
  }
}

module.exports = SignInForm;

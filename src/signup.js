import {CognitoUserAttribute} from "amazon-cognito-identity-js";


import React from "react";

export class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
    };
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
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
    const email = this.state.email.trim();
    const username = this.state.username.trim();
    const password = this.state.password.trim();
    var attributeList = [new CognitoUserAttribute({ Name: 'email', Value: email })];
    attributeList.push(new CognitoUserAttribute({ Name: 'given_name', Value: username}));
    attributeList.push(new CognitoUserAttribute({ Name: 'phone_number', Value: '+31622777923'}));

    userPool.signUp(username, password, attributeList, null, (err, result) => {
      if (err) {
        alert(err+"\nPlease try again");
        return;
      }
      alert(result);
    });
  }

  render() {
    return (
      <div>
        <h1>Sign up</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="email"
                 value={this.state.email}
                 placeholder="Email"
                 onChange={this.handleEmailChange.bind(this)}/><br/>
           <input type="text"
                  value={this.state.username}
                  placeholder="Username"
                  onChange={this.handleUsernameChange.bind(this)}/><br/>
          <input type="password"
                 value={this.state.password}
                 placeholder="Password"
                 onChange={this.handlePasswordChange.bind(this)}/><br/>
          <input type="submit" value="Sign up"/>
        </form>
      </div>
    );
  }
}

module.exports = SignUpForm;

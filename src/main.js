import {Config, CognitoIdentityCredentials} from "aws-sdk";
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails
} from "amazon-cognito-identity-js";
import React from "react";
import ReactDOM from "react-dom";
import SignUpForm from "./signup.js";
import ConfirmRegistrationForm from "./confirmRegistration.js";
import ForgotPasswordForm from "./forgotPassword.js";
import SignInForm from "./signin.js";


import appConfig from "./config";

Config.region = appConfig.region;
Config.credentials = new CognitoIdentityCredentials({
  IdentityPoolId: appConfig.IdentityPoolId
});

const userPool = new CognitoUserPool({
  UserPoolId: appConfig.UserPoolId,
  ClientId: appConfig.ClientId,
});

var signupDiv = document.createElement('div');
signupDiv.setAttribute("id", "signup");
document.body.appendChild(signupDiv);
var confirmRegistrationDiv = document.createElement('div');
confirmRegistrationDiv.setAttribute("id", "confirmRegistration");
document.body.appendChild(confirmRegistrationDiv);
var forgotPasswordDiv = document.createElement('div');
forgotPasswordDiv.setAttribute("id", "forgotPassword");
document.body.appendChild(forgotPasswordDiv);
var signinDiv = document.createElement('div');
signinDiv.setAttribute("id", "signin");
document.body.appendChild(signinDiv);

ReactDOM.render(<SignUpForm userPool={userPool}/>, document.getElementById('signup'));
ReactDOM.render(<ConfirmRegistrationForm userPool={userPool}/>, document.getElementById('confirmRegistration'));
ReactDOM.render(<ForgotPasswordForm userPool={userPool}/>, document.getElementById('forgotPassword'));
ReactDOM.render(<SignInForm userPool={userPool}/>, document.getElementById('signin'));

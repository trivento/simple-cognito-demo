# Simple AWS Cognito demo

A single html page where differrent authentication flows, in relation to AWS Cognitot are shown. 

## Getting started
To run the example first setup your AWS configuration. 

```js
// src/config.js
export default {
  region: '',
  UserPoolId: '',
  ClientId: '',
}
```

Now, you are ready to build this demo web app.

```
npm install
npm run dev // to run it with webpack-dev-server
npm run build // to (re)create the dist package
```

Open browser to try this example.

```
open dist/index.html
```
## Origins
This example is build on top of [amazon-cognito-identity-js](https://github.com/aws/amazon-cognito-identity-js). AWS supplies a [tutorial](http://docs.aws.amazon.com/cognito/latest/developerguide/setting-up-the-javascript-sdk.html) that I followed. The tutorial is build on top of the [amazon-cognito-identity-js](https://github.com/aws/amazon-cognito-identity-js) node module. In this module 25 use cases are described.

## Supported authentication flows
The demo supports the following flows:
- sign up from the demo app; a verification code is sent by email and can be entered; a new verification code can be requested;
- sign up by an admin in the AWS console; an email is sent with a temporary password that must be changed on first login;
- password forgotten flow, including entering the emailed verification code and the new password;
- sign in; after login the access and identity tokens are displayed;

All flows are incorporated in a single page.

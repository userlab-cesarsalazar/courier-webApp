import Amplify from 'aws-amplify'

export default Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: 'us-east-1:aabd36ad-c815-4d04-be18-af97d04f8a98',
    // REQUIRED - Amazon Cognito Region
    region: 'us-east-1',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'us-east-1_LDrHk3Y2p',
    identityPoolRegion: 'us-east-1',

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '75eu3q7u3fs6jqp22tqimts01k',

    authenticationFlowType: 'USER_PASSWORD_AUTH',
    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false,
  },
})

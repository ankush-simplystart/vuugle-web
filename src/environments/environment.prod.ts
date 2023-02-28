// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
 
export const environment = {
  production: true,
  s3_public_url: "https://7f2towrletbargb4epdhojtgea0xhggm.lambda-url.us-east-1.on.aws",
  cognito: {
        userPoolId: 'us-east-1_xh5z3QYel',
        userPoolWebClientId: '4301cpq6kjojds55u3b5fusdu2',
        coginitoAuthUrl: 'https://vuugle1.auth.us-east-1.amazoncognito.com',
        callBackUrl: 'http://localhost:4000',
        oauth: {
            domain: 'vuugle1.auth.us-east-1.amazoncognito.com',
            scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
            redirectSignIn: 'http://localhost:4000',
            redirectSignOut: 'http://localhost:4000/login',
            responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
        },
        localStorage: {
            domain: 'http://localhost:4000/',
            path: '/',
            expires: 12000,
            secure: 'false',
        },
        federationTarget: 'COGNITO_USER_POOLS',
    },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

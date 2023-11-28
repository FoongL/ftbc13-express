const { auth } = require('express-oauth2-jwt-bearer');

const jwtCheck = auth({
    audience: 'https://ftbc-13-auth-sample.com',
    issuerBaseURL: 'https://dev-qi8ysaccyg7lpwmk.us.auth0.com/',
    tokenSigningAlg: 'RS256'
  });


module.exports = jwtCheck
const jwkToPem = require('jwk-to-pem');
const axios = require('axios');
const readlineSync = require('readline-sync');

/**
 * Get cognito's secret key
 * @returns {String} PEM
 */
function getPem() {
  const region =
    readlineSync.question('Enter region: (us-east-1) ') || 'us-east-1';
  const userPoolId =
    readlineSync.question('Enter user pool id: (us-east-1_ALsGSxwBD) ') ||
    'us-east-1_ALsGSxwBD';

  axios
    .get(
      `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`
    )
    .then(({ data }) => jwkToPem(data.keys.shift()).split('\n').join('\\n'))
    .then(console.log)
    .catch(() => console.log('Could not execute statement'));
}

getPem();

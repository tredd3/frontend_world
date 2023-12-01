/* eslint-disable import/no-extraneous-dependencies, @typescript-eslint/no-var-requires */
const fetch = require('node-fetch');
const qs = require('querystring');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const envs = {
  pp: {
    submitMobileURL: 'https://api.jiolabs.com/idam/trialwifi/v3/dip/otp/send',
    verifyURL: 'https://api.jiolabs.com/idam/trialwifi/v3/dip/otp/verify',
    validateUserURL: 'https://api-preprod.rpay.co.in/cr/v1/validateuser',
    apiKey: 'l7xxeedfb8ff73364bb8a623c255e1a63299',
    validateUserApiKey: 'l7xxd301d443a2294a7ea03b0aac0f77505d',
    authorization: 'bDd4eGQzMDFkNDQzYTIyOTRhN2VhMDNiMGFhYzBmNzc1MDVkOmFhNzM2MzkyNjkwMjRkNDViMGUxODBiNjQwYTg3ZWJj'
  },
  prod: {
    submitMobileURL: 'https://api.jio.com/idam/trialwifi/v3/dip/otp/send',
    verifyURL: 'https://api.jio.com/idam/trialwifi/v3/dip/otp/verify',
    validateUserURL: 'https://api.jiomoney.com/cr/v1/validateuser',
    apiKey: 'l7xx49670df3e8084afcbcb5ca632c20133c',
    validateUserApiKey: 'l7xxd82dd824f0d14fbfb4616cd49205d5de',
    authorization: 'bDd4eGQ4MmRkODI0ZjBkMTRmYmZiNDYxNmNkNDkyMDVkNWRlOmNlOGYwOGJjN2FkNjQ5M2JiZTk4NzQ5NDkwOTYyZTll'
  },
  sit: {
    submitMobileURL: 'https://api-sit.jio.com/idam/trialwifi/v3/dip/otp/send',
    verifyURL: 'https://api-sit.jio.com/idam/trialwifi/v3/dip/otp/verify',
    validateUserURL: 'https://api-sit.jio.com/cr/v1/validateuser',
    apiKey: 'l7xx9652ebac277544b0bdbf829fe0557a1d',
    validateUserApiKey: 'l7xx9652ebac277544b0bdbf829fe0557a1d',
    authorization: 'bDd4eDk2NTJlYmFjMjc3NTQ0YjBiZGJmODI5ZmUwNTU3YTFkOjkxNWZmYjBkMjg3OTRkNGE4N2YyNjg0YTZjMDBkMzll'
  }
};

const [phoneNumber, env] = [...process.argv.reverse()];

if (!Object.keys(envs).includes(env)) {
  console.error('[ERROR] Phone number not supplied');
  console.error('  Usage: npm run token:<env> <phonenumber>');
  console.error('  Example: npm run token:pp 9812312123');
  process.exit();
}

const envVars = envs[env];

const sendOTP = () => fetch(envVars.submitMobileURL, {
  method: 'post',
  headers: {
    Accept: 'application/json',
    'x-api-key': envVars.apiKey,
    'app-name': 'RJIL_JioKart',
    'Content-Type': 'application/json',
    'Accept-Encoding': 'gzip',
    'User-Agent': 'okhttp/3.12.0',
    'cache-control': 'no-cache'
  },
  body: JSON.stringify({ identifiers: [phoneNumber] })
})
  .then(response => {
    if (!response.ok) {
      console.log(`Error when trying to send OTP: ${response.status}.`);
      return response.json();
    }
  }).then(json => {
    if (json) {
      console.log(JSON.stringify(json, null, 2));
      console.log('\n\nTrying to proceed anyway');
    }
  });

const scrapeOTP = () => fetch('http://10.50.110.255:3001/', {
  method: 'post',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'text/html',
    'Accept-Encoding': 'gzip, deflate'
  },
  body: qs.encode(
    env === 'pp' ? {
      env: 'PP',
      option: 'jiokartotp'
    } : {
      env: 'SIT',
      option: 'neotp'
    }
  )
})
  .then(response => {
    if (!response.ok) throw new Error(`Error when trying to scrape OTP: ${response.status}.`);
    return response.text();
  })
  .then(html => {
    const $ = cheerio.load(html);
    let phoneNumberIndex = -1;
    let otp;
    $('#resultsTableId td').each((i, element) => {
      const elementText = $(element).text();
      if (elementText === phoneNumber) phoneNumberIndex = i;
      if (phoneNumberIndex !== -1 && phoneNumberIndex + 1 === i) otp = elementText;
    });

    return otp;
  });

const getSSOToken = otp => fetch(envVars.verifyURL, {
  method: 'post',
  headers: {
    Accept: 'application/json',
    'x-api-key': envVars.apiKey,
    'app-name': 'RJIL_JioKart',
    'Content-Type': 'application/json',
    'Accept-Encoding': 'gzip',
    'User-Agent': 'okhttp/3.12.0',
    'cache-control': 'no-cache'
  },
  body: JSON.stringify({
    identifier: phoneNumber,
    otp,
    shallBecomeIdentifierIfNotTaken: 'F'
  })
})
  .then(response => {
    if (!response.ok) {
      console.error(`Error when trying to submit OTP: ${response.status}.`);
    }
    return response.json();
  })
  .then(json => json.ssoToken);

const validateUser = sso => fetch(envVars.validateUserURL, {
  method: 'post',
  headers: {
    Accept: 'application/json',
    'x-api-key': envVars.validateUserApiKey,
    Authorization: `Basic ${envVars.authorization}`,
    'app-name': 'RJIL_JioKart',
    'sso-token': sso,
    'Content-Type': 'application/json',
    'Accept-Encoding': 'gzip'
  }
})
  .then(res => {
    if (!res.ok) console.error(`Error when trying to validate user: ${res.status}`);

    return res.json();
  })
  .then(json => json.access_tokens);

const writeTokenToFile = token => {
  fs.writeFileSync(path.join(__dirname, '../src/token.js'), `export default '${token}';\n`);
};

sendOTP()
  .then(scrapeOTP)
  .then(getSSOToken)
  .then(validateUser)
  .then(writeTokenToFile)
  .then(() => {
    console.log('Token written to src/token.js');
  });


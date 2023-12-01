'use strict';

const fs = require('fs');
const path = require('path');
const paths = require('./paths');

// Make sure that including paths.js after env.js will read .env variables.
delete require.cache[require.resolve('./paths')];

const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
  throw new Error(
    'The NODE_ENV environment variable is required but was not specified.'
  );
}

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
var dotenvFiles = [
  `${paths.dotenv}.${NODE_ENV}.local`,
  `${paths.dotenv}.${NODE_ENV}`,
  // Don't include `.env.local` for `test` environment
  // since normally you expect tests to produce the same
  // results for everyone
  NODE_ENV !== 'test' && `${paths.dotenv}.local`,
  paths.dotenv,
].filter(Boolean);

// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.  Variable expansion is supported in .env files.
// https://github.com/motdotla/dotenv
// https://github.com/motdotla/dotenv-expand
dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    require('dotenv-expand')(
      require('dotenv').config({
        path: dotenvFile,
      })
    );
  }
});

// We support resolving modules according to `NODE_PATH`.
// This lets you use absolute paths in imports inside large monorepos:
// https://github.com/facebook/create-react-app/issues/253.
// It works similar to `NODE_PATH` in Node itself:
// https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders
// Note that unlike in Node, only *relative* paths from `NODE_PATH` are honored.
// Otherwise, we risk importing Node.js core modules into an app instead of Webpack shims.
// https://github.com/facebook/create-react-app/issues/1023#issuecomment-265344421
// We also resolve them to make sure all tools using them work consistently.
const appDirectory = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (process.env.NODE_PATH || '')
  .split(path.delimiter)
  .filter(folder => folder && !path.isAbsolute(folder))
  .map(folder => path.resolve(appDirectory, folder))
  .join(path.delimiter);

// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.
const REACT_APP = /^REACT_APP_/i;

function getClientEnvironment(publicUrl) {
  let baseUrl = "", baseUrlLogin="", apiVersion = 0, product = 0, geolocationApiKey = "",
    appName = process.env.npm_package_maintitle,
    appVersion = process.env.npm_package_version,
    apiKey = "",
    apiKeyLogin="",
    authVal = "",
    proxyUrl="";
  if(process.env.APP_ENV == "LOCAL") {
    baseUrl = process.env.BASE_URL_LOCAL;
    apiVersion = process.env.API_VERSION_LOCAL;
    product = process.env.PRODUCT_VERSION_LOCAL;
    geolocationApiKey = process.env.GEOLOCATION_API_KEY_LOCAL;
    authVal = process.env.AUTHORISATION_VALUE_LOCAL;
    apiKey = process.env.API_KEY_LOCAL;
    apiKeyLogin = process.env.API_KEY_LOCAL_LOGIN;
    baseUrlLogin= process.env.BASE_URL_LOCAL_LOGIN;
    proxyUrl = process.env.PROXY_URL_LOCAL;
  } else if(process.env.APP_ENV == "SIT") {
    baseUrl = process.env.BASE_URL_SIT;
    apiVersion = process.env.API_VERSION_SIT;
    product = process.env.PRODUCT_VERSION_SIT;
    geolocationApiKey = process.env.GEOLOCATION_API_KEY_SIT;
    authVal = process.env.AUTHORISATION_VALUE_SIT;
    apiKey = process.env.API_KEY_SIT;
    apiKeyLogin = process.env.API_KEY_SIT_LOGIN;
    baseUrlLogin= process.env.BASE_URL_SIT_LOGIN
  } else if(process.env.APP_ENV == "PP") {
    baseUrl = process.env.BASE_URL_PP;
    apiVersion = process.env.API_VERSION_PP;
    product = process.env.PRODUCT_VERSION_PP;
    geolocationApiKey = process.env.GEOLOCATION_API_KEY_PP;
    apiKey = process.env.API_KEY_PP;
    apiKeyLogin = process.env.API_KEY_PP_LOGIN;
    baseUrlLogin= process.env.BASE_URL_PP_LOGIN;
    authVal = process.env.AUTHORISATION_VALUE_PP;
  } else if(process.env.APP_ENV == "PROD") {
    baseUrl = process.env.BASE_URL_PROD;
    apiVersion = process.env.API_VERSION_PROD;
    product = process.env.PRODUCT_VERSION_PROD;
    geolocationApiKey = process.env.GEOLOCATION_API_KEY_PROD;
    apiKey = process.env.API_KEY_PROD;
    apiKeyLogin = process.env.API_KEY_LOGIN;
    baseUrlLogin= process.env.BASE_URL_PROD_LOGIN;
    authVal = process.env.AUTHORISATION_VALUE_PP;
  }
  const raw = Object.keys(process.env)
    .filter(key => REACT_APP.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {
        // Useful for determining whether we’re running in production mode.
        // Most importantly, it switches React into the correct mode.
        NODE_ENV: process.env.NODE_ENV || 'development',
        // Useful for resolving the correct path to static assets in `public`.
        // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
        // This should only be used as an escape hatch. Normally you would put
        // images into the `src` and `import` them in code to get their paths.
        PUBLIC_URL: publicUrl,
        BASE_URL: baseUrl,
        API_VERSION: apiVersion,
        PRODUCT_VERSION: product,
        APP_NAME: appName,
        APP_VERSION: appVersion,
        APP_ENV: process.env.APP_ENV,
        GEOLOCATION_API_KEY: geolocationApiKey,
        AUTHORISATION_VALUE: authVal,
        API_KEY: apiKey,
        API_KEY_LOGIN: apiKeyLogin,
        PROXY_URL: proxyUrl,
        BASE_URL_LOGIN: baseUrlLogin,
        APP_TYPE: process.env.APP_TYPE
      }
    );
  // Stringify all values so we can feed into Webpack DefinePlugin
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };

  return { raw, stringified };
}

module.exports = getClientEnvironment;

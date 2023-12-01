# JioMart Web App
This is the web app bootstrapped with [CRA](https://github.com/facebook/create-react-app). The app used inside MyJio android and iOS native apps using a webview.

## Dev Setup
Open JioMartLogin.html in insecure mode using the following command

`open -na "Google Chrome" --args --user-data-dir=/Users/<username>/.config/google-chrome --disable-web-security --disable-site-isolation-trials`

Use the form to generate Token for authentication

`npm install` from inside the directory will install all the dependencies from nexus (configured inside .npmrc) as well as generate two files:
* .env.local : Copy REACT_APP_BASE_URL from either .env.pre-prod or .env.production
* /src/token.js : Copy the generated token from above form (JioMartLogin.html) into this file

Alternately, to set PP token use the command: `npm run token:pp`

Start the local dev server:
`npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Mocking APIs
This application uses [json-server](https://www.npmjs.com/package/json-server) as a mock server. The mock responses can be configured inside `/src/mocks/db.json`. By default `npm start` points to this mock server if base url is not configured inside .env.local

## Automated Testing

`npm test`: Launches the test runner in interactive mode

`npm run test:ci`: Runs the test in non-interactive mode, used in CI pipelines

## Building the App

 `npm run build`
There are separate build scripts inside package.json for different environments

* `npm run build:sit`
* `npm run build:pre-prod`
* `npm run build:production`


## Deployment
Automatic deployment can be done to SIT using the [pipeline](https://devops.jio.com/JioFinancialServices/New%20Commerce%20JioMart/_release?view=mine&definitionId=1)
For deploying to pre-prod and prod, use the above commands for building and attach the build to the Release Request (RR) in a format like 

`JioMartWebPP-03:02:2020.zip`   


const fs = require('fs');
const path = require('path');

const envLocalLocation = path.join(__dirname, '..', '.env.local');
const envProductionLocation = path.join(__dirname, '..', '.env.production');
const tokenLocation = path.join(__dirname, '..', './src/token.js');

if (!fs.existsSync(envLocalLocation)) {
  fs.copyFileSync(envProductionLocation, envLocalLocation);
}

if (!fs.existsSync(tokenLocation)) {
  fs.appendFileSync(tokenLocation, 'export default \'token_goes_here\';\n');
}


var http = require('http');
var fs = require('fs');

const options = {
    host: 'www.stackoverflow.com',
    port: 80,
    path: '/index.html'
  };

function test(){
    console.log('Start');
    setTimeout(() => console.log('TO1'), 1000);
    setImmediate(() => console.log('IM1'));
    process.nextTick(() => console.log('NT1'));
    setImmediate(() => console.log('IM2'));
    process.nextTick(() => console.log('NT2'));
    http.get(options, () => console.log('IO1'));
    fs.readdir(process.cwd(), () => console.log('IO2'));
    setImmediate(() => console.log('IM3'));
    process.nextTick(() => console.log('NT3'));
    setImmediate(() => console.log('IM4'));
    setTimeout(() => console.log('TO2'), 0);
    fs.readdir(process.cwd(), () => console.log('IO3'));
    console.log('Done');
}
test()
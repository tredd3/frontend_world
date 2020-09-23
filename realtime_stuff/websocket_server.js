const http = require('http');
const ws = require('ws');
const buf4 = Buffer.from([1, 2, 3]);
console.log(buf4)
const wss = new ws.Server({ noServer: true });

function accept(req, res) {
    // all incoming requests must be websockets
    if (!req.headers.upgrade || req.headers.upgrade.toLowerCase() != 'websocket') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end("up and running");
        return;
    }

    // can be Connection: keep-alive, Upgrade
    if (!req.headers.connection.match(/\bupgrade\b/i)) {
        res.end();
        return;
    }

    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onConnect);
}

function onConnect(ws) {
    ws.on('message', function (message) {
        let name = message.match(/([\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]+)$/gu) || "Guest";
        ws.send(`Hello from server, ${name}!`);
        console.log(message)
        //setTimeout(() => ws.close(1000, "Bye!"), 5000);
    });
}

if (!module.parent) {
    http.createServer(accept).listen(8080, () => console.log('server running on 8080............'));
} else {
    exports.accept = accept;
}
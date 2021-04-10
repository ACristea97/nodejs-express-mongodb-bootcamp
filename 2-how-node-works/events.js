const EventEmitter = require('events');
const http = require('http');

class Sales extends EventEmitter {
    constructor () {
        super();
    }
}

const emitter = new Sales();

emitter.on('newSale', () => {
    console.log('There was a new sale!');
});

emitter.on('newSale', bought => {
    console.log(`You bought ${bought} items.`);
});

emitter.on('newSale', () => {
    console.log('Thank you for your purchase.');
});

emitter.emit('newSale', 9);

const server = http.createServer();

server.on('request', (request, response) => {
    response.end('Request received!');
});

server.on('request', (request, response) => {
    console.log('Another request received!');
});

server.on('close', () => {
    console.log('Server closed.');
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Waiting for requests...');
});
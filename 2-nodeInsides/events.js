const EventEmitter = require('events');
const http = require('http');

class Sales extends EventEmitter {
	constructor() {
		super();
	}
}
const myEmitter = new Sales();

myEmitter.on('newSale', () => {
	console.log('there was a new sale');
});

myEmitter.on('newSale', () => {
	console.log('there was a new sale2');
});

myEmitter.on('newSale', (stock) => {
	console.log('there are now  ' + stock + ' in stock');
});

myEmitter.emit('newSale', 9);

//////////////////////////////////////////////////////////////////////////
const server = http.createServer();

server.on('request', (req, res) => {
	console.log('received request: ');
	console.log(req.url);
	res.end('req recieved');
});

server.on('request', (req, res) => {
	console.log('another request');
});

server.on('close', () => {
	console.log('server closed');
});

server.listen(8000, 'localhost', () => {
	console.log('listening on localhost:8000');
});

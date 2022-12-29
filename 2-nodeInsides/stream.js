const fs = require('fs');
const server = require('http').createServer();
const eventEmitter = require('events');
const { Readable } = require('stream');

//test1();
//test 1 emitter and server
function test1() {
	class fileEvent extends eventEmitter {
		constructor() {
			super();
		}
	}

	const fileEvent1 = new fileEvent();

	fileEvent1.on('readFile', (filePath, res) => {
		fs.readFile('test-file.txt', 'utf8', (err, data) => {
			if (data) {
				res.end(data);
			}
		});
	});

	server.on('request', (req, res) => {
		console.log(`Success ${req.url}`);
		fileEvent1.emit('readFile', 'test-file.txt', res);
	});

	server.listen(8000, 'localhost', (err) => {
		console.log(`Server listening on ${server.address().port}`);
	});
}

//test 2 emitter and server
function test2() {
	server.on('request', (req, res) => {
		console.log(`Success ${req.url}`);
		fs.readFile('test-file.txt', 'utf8', (err, data) => {
			if (err) console.log(err);
			res.end(data);
		});
	});

	server.listen(8000, 'localhost', (err) => {});
}

// best way with streams
//test3(); //backpreassure
function test3() {
	server.on('request', (req, res) => {
		console.log(`Success ${req.url}`);
		const redable = fs.createReadStream('test-file.txt');

		redable.on('data', (chunk) => {
			res.write(chunk); //response is a wrtitable stream
			console.log(chunk.length);
		});

		redable.on('end', () => {
			res.end();
		});

		redable.on('error', (err) => {
			console.log(err);
			res.statusCode = 500;

			res.end('file not found');
		});
	});

	server.listen(8000, 'localhost', (err) => {
		console.log(`Server listening on ${server.address().port}`);
	});
}

//////////////////////////////////////////////////////////////////////

// solve backpressure problem pipe operator
test4();
function test4() {
	server.on('request', (req, res) => {
		const redable = fs.createReadStream('test-file.txt');
		redable.pipe(res); // pipe solves the backpressure problem
	});
	//redableSource.pipe(writebleStream)
	server.listen(8000, 'localhost', (err) => {});
}

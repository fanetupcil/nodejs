function evenLoop() {
	const fs = require('fs');
	const crypto = require('crypto'); // unloaded auto to the thread pool;

	const start = Date.now();
	process.env.UV_THREADPOOL_SIZE = 2; // number of threads to run in the pool

	setTimeout(() => console.log('Timer 1 finished'), 0);
	setImmediate(() => console.log('Immidiate 1 finished'));

	fs.readFile('test-file.txt', 'utf8', () => {
		console.log('I/O finished');
		console.log('-------------------------------------');
		setTimeout(() => console.log('Timer 2 finished'), 0);
		setTimeout(() => console.log('Timer 3 finished'), 3000);

		setImmediate(() => console.log('Immidiate 2 finished'));

		process.nextTick(() => console.log('process.nextTick finished'));

		crypto.pbkdf2Sync('password', 'salt', 1000000, 1024, 'sha512');
		console.log(Date.now() - start, 'crypto.pbkdf2 finished ---');

		crypto.pbkdf2(
			'password',
			'salt',
			100000,
			1024,
			'sha512',
			(err, derivedKey) => {
				console.log(Date.now() - start, 'crypto.pbkdf2 finished');
			}
		);
		crypto.pbkdf2(
			'password',
			'salt',
			100000,
			1024,
			'sha512',
			(err, derivedKey) => {
				console.log(Date.now() - start, 'crypto.pbkdf2 finished');
			}
		);
		crypto.pbkdf2(
			'password',
			'salt',
			100000,
			1024,
			'sha512',
			(err, derivedKey) => {
				console.log(Date.now() - start, 'crypto.pbkdf2 finished');
			}
		);
	});

	console.log('Hello from the top-level');
}

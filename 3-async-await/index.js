const fs = require('fs');
const http = require('http');
const superagent = require('superagent');

const readFilePro = (file) => {
	return new Promise((resolve, reject) => {
		fs.readFile(file, 'utf8', (err, data) => {
			if (err) reject('i could not find that file 🥲 ');
			resolve(data); // what we pas to resolve fct will be available later
		});
	});
};

const writeFilePro = (file, data) => {
	return new Promise((resolve, reject) => {
		fs.writeFile(file, data, (err) => {
			if (err) reject('could not write file');
			resolve();
		});
	});
};

////////////
//Async await
////////////

const getDogPic = async () => {
	try {
		const data = await readFilePro(`${__dirname}/dog.txt`);
		console.log(`Breed :${data}`);

		const res1Pro = superagent.get(
			`https://dog.ceo/api/breed/${data}/images/random`
		);
		const res2Pro = superagent.get(
			`https://dog.ceo/api/breed/${data}/images/random`
		);
		const res3Pro = superagent.get(
			`https://dog.ceo/api/breed/${data}/images/random`
		);

		const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
		const imgs = all.map((el) => el.body.message);
		console.log(imgs);

		await writeFilePro('dog-img.txt', imgs.join('\n'));
		console.log('image of puppy saved');
	} catch (err) {
		console.log(err);
		throw err;
	}
	return '2:REDY 😍';
};

(async () => {
	try {
		const x = await getDogPic();
		console.log(x);
		console.log('3: done gettong');
	} catch (err) {
		console.log('error 💥 ');
	}
})();

/* without async await
console.log('1: Will get dog pics');
getDogPic()
	.then((x) => {
		console.log(x);
		console.log('3: done gettong');
	})
	.catch((err) => {
		console.log('error 💥 ');
	});
*/

/////////////
//Chained 'then
////////////
/*
readFilePro(`${__dirname}/dog.txt`)
	.then((data) => {
		console.log(`Breed :${data}`);

		return superagent.get(
			`https://dog.ceo/api/breed/${data}/images/random`
		);
	})
	.then((res) => {
		//only gets called on success (resolved promise)
		console.log(res.body.message);
		return writeFilePro('dog-img.txt', res.body.message);
	})
	.then(() => {
		console.log('image of puppy saved');
	})
	.catch((err) => {
		console.log(err);
	});
*/

/// callback hell
///
// fs.readFile(`${__dirname}/dog.txt`, 'utf8', (err, data) => {
// 	console.log(`Breed :${data}`);

// 	superagent
// 		.get(`https://dog.ceo/api/breed/${data}/images/random`)
// 		.then((res) => {
// 			//only gets called on success (resolved promise)
// 			console.log(res.body.message);

// 			fs.writeFile('dog-img.txt', res.body.message, (err) => {
// 				if (err) return console.log(err);
// 				console.log('image written');
// 			});
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 		});
// });

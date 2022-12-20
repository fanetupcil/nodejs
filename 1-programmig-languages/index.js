const fs = require('fs');
const http = require('http');
const url = require('url');

const replaceCards = require('./modules/replaceCards.js');

const tempOver = fs.readFileSync(
	`${__dirname}/templates/template-overview.html`,
	'utf8'
);
const tempCard = fs.readFileSync(
	`${__dirname}/templates/template-card.html`,
	'utf8'
);
const tempProd = fs.readFileSync(
	`${__dirname}/templates/template-product.html`,
	'utf8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf8');
const cards_data = JSON.parse(data);

//////
//Server
//////

const server = http.createServer((req, res) => {
	const { query, pathname } = url.parse(req.url, true);

	//Overview
	if (pathname === '/overview' || pathname === '/') {
		res.writeHead(200, { 'Content-Type': 'text/html' });

		const cardsHtml = cards_data
			.map((el) => replaceCards(tempCard, el))
			.join('');
		const overview = tempOver.replace(/{%PRODUCT_CARDS%}/, cardsHtml);

		res.end(overview);

		//Product
	} else if (pathname === '/product') {
		res.writeHead(200, { 'Content-Type': 'text/html' });

		const product = cards_data[query.id];
		const productHtml = replaceCards(tempProd, product);
		res.end(productHtml);

		///Api
	} else if (pathname === '/api') {
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify(cards_data));

		//Not found
	} else {
		res.writeHead(404, { 'Content-Type': 'text/html' });
		res.end('Page not found ');
	}
});

server.listen(8000, 'localhost', () => {
	console.log('listening');
});

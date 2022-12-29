// class Calculator {
// 	add(a, b) {
// 		return a + b;
// 	}
// 	sub(a, b) {
// 		return a - b;
// 	}
// 	mul(a, b) {
// 		return a * b;
// 	}
// 	div(a, b) {
// 		return a / b;
// 	}
// }

module.exports = class {
	add(a, b) {
		return a + b;
	}
	sub(a, b) {
		return a - b;
	}
	mul(a, b) {
		return a * b;
	}
	div(a, b) {
		return a / b;
	}
}; // we use module.exports for one single thing

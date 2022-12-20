module.exports = function (template, card) {
	let output = template.replace(/{%IMAGE%}/g, card.image);
	output = output.replace(/{%PRODUCTNAME%}/g, card.productName);
	output = output.replace(/{%FROM%}/g, card.from);
	output = output.replace(/{%YEAR%}/g, card.year);
	output = output.replace(/{%LEARNED%}/g, card.learned);
	output = output.replace(/{%DESCRIPTION%}/g, card.description);
	output = output.replace(/{%DIFFICULTY%}/g, card.difficulty);
	output = output.replace(/{%ID%}/g, card.id);

	if (!card.learned) {
		output = output.replace(/{%NOT_LEARNED%}/g, 'not-learned ');
	}
	return output;
};

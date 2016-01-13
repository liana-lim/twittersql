function interleave () {

	var allTheStrings = [].slice.call(arguments);

	var maxLength = allTheStrings.reduce(function (maxValue, aString) {
		return Math.max(maxValue, aString.length);
	}, 0);

	var newString = '';
	for (var i = 0; i < maxLength; i++) { // loop through ith letter, of:
		for (var j = 0; j < allTheStrings.length; j++) { // each string
			if (typeof allTheStrings[j][i] === 'string') { // guard against undefined
				newString += allTheStrings[j][i];
			}
		}
	}
	return newString;

};

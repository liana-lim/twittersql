var inquirer = require('inquirer');

var game = require('./game.source');

function promptNode (node) {
	var questionObj = {
		name: node.title,
		message: node.text,
		choices: node.getConnectionStrings()
	};
	inquirer.prompt(questionObj, function (answerObject) {
		var nextCondition = answerObject[node.title];
		var nextNode = node.route(nextCondition);
		if (!nextNode) {
			return;
		} else if (nextNode.connections.length === 0) {
			console.log(nextNode.text);
		} else {
			promptNode(nextNode);
		}
	});
}

promptNode(game.startingPoint);
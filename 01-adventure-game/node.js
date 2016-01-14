var Connection = require('./connection');

var Node = function(title, text) {
	this.title = title;
	this.text = text;
	this.connections = [];
};

Node.prototype.connect = function (targetNode, condition) {
	// make a connection pointing from this node to the target
	// persuant to the condition
	if (this.hasConnectionCondition(condition)) {
		throw new Error('Duplicate condition: ' + condition);
	}
	this.connections.push(new Connection(targetNode, condition));
};

Node.prototype.route = function (targetCondition) {
	// tells you where to go
	// returns a node that matches the condition
	for (var i = 0; i < this.connections.length; i++) {
		if (targetCondition == this.connections[i].condition) {
			return this.connections[i].nextNode;
		}
	}
};

Node.prototype.getConnectionStrings = function () {
	return this.connections.map(function (connection) {
		return connection.condition;
	});
};

Node.prototype.hasConnectionCondition = function (possibleCondition) {
	return this.getConnectionStrings().some(function (condition) {
		return condition == possibleCondition;
	});
};

module.exports = Node;

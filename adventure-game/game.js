var Node = require('./node');

var Game = function() {
	this.nodes = {};
	this.startingPoint = null;
};

Game.prototype.addNode = function (title, text) {
	if (this.getNode(title)) {
		throw new Error('We already have a node with the name: ' + title);
	}
	var theNode = new Node(title, text);
	this.nodes[title] = theNode;
	if (this.startingPoint === null) {
		this.startingPoint = theNode;
	}
	return theNode;
};

Game.prototype.getNode = function (title) {
	// console.log('foobar what is going wrong', this);
	return this.nodes[title];
};

Game.prototype.connect = function (titleForNodeA, titleForNodeB, condition) {
	// makes connection between two nodes
	var nodeA = this.getNode(titleForNodeA);
	var nodeB = this.getNode(titleForNodeB);
	nodeA.connect(nodeB, condition);
};

Game.prototype.celebrate = function () {
	return 'win';
};

module.exports = Game;

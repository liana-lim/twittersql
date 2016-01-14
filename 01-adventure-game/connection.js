var Connection = function(nextNode, condition) {
	this.nextNode = nextNode;
	this.condition = condition;
};

Connection.prototype.test = function (possibleCondition) {
	if (this.condition === undefined) {
		return true;
	}
	return this.condition == possibleCondition;
};

module.exports = Connection;

'use strict';

function Node (value, previous, next) {
  this.value = value;
  this.previous = previous || null;
  this.next = next || null;
}

function LinkedList () {}

LinkedList.prototype.addToTail = function(element) {
  var newNode = new Node(element, this.tail);
  if (this.tail) this.tail.next = newNode;
  else this.head = newNode;
  this.tail = newNode;
};

LinkedList.prototype.removeTail = function() {
  if (!this.tail) return;
  var value = this.tail.value;
  this.tail = this.tail.previous;
  if (this.tail) this.tail.next = null;
  else this.head = null;
  return value;
};

// head methods are exact opposite of tail methods

LinkedList.prototype.addToHead = function(element) {
  var newNode = new Node(element, null, this.head);
  if (this.head) this.head.previous = newNode;
  else this.tail = newNode;
  this.head = newNode;
};

LinkedList.prototype.removeHead = function() {
  if (!this.head) return;
  var value = this.head.value;
  this.head = this.head.next;
  if (this.head) this.head.previous = null;
  else this.tail = null;
  return value;
};

// INCOMPLETE (would need more checks e.g. for tail)
// LinkedList.prototype.insert = function(element, prevNode) {
//   var nextNode = prevNode.next;
//   var newNode = new Node(element, prevNode, nextNode);
//   prevNode.next = newNode;
//   nextNode.previous = newNode;
// };

function isFn (maybeFn) { return typeof maybeFn === 'function'; }

LinkedList.prototype.search = function(predicate) {
  var correct = isFn(predicate) ? predicate : function(value){ return value == predicate; }; // == for valueOf
  var currentNode = this.head;
  while (currentNode) {
    if (correct(currentNode.value)) return currentNode.value;
    currentNode = currentNode.next;
  }
  return null;
};

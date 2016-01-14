var expect = require('chai').expect
var Connection = require('../connection')
var Node = require('../node')

describe('Connection', function() {
  var aNode

  before(function() {
    aNode = new Node()
  })

  it('adopts nextNode and condition from constructor parameters', function() {
    var someConnection = new Connection(aNode, 'foo')
    expect(someConnection.nextNode).to.equal(aNode)
    expect(someConnection.condition).to.equal('foo')
  })

  it('tests true when the connection has no condition', function() {
    var someConnection = new Connection(aNode)
    expect(someConnection.test('any value... anything')).to.be.true
  })

  it('tests true when the input matches the condition', function() {
    var someConnection = new Connection(aNode, 'fluf cats')
    expect(someConnection.test('fluf cats')).to.be.true
  })

  it('tests false when the input does not match the condition', function() {
    var someConnection = new Connection(aNode, 'fluf cats')
    expect(someConnection.test('foo dogs')).to.be.false
  })

})
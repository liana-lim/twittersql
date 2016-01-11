var expect = require('chai').expect;
var Node = require('../node');

describe('Node', function() {

  // first let's just set up some basic assertions 
  // about how the "Node" class works

  it('adopts title and text from constructor parameters', function() {
    var myNode = new Node('some title', 'some text')
    expect(myNode.title).to.equal('some title')
    expect(myNode.text).to.equal('some text')
  })

  it('starts with an empty connections array', function() {
    expect(new Node().connections).to.eql([])
  })

  // now, let's describe how we can wire up nodes 
  // and then test if we switch from one node to 
  // another with a certain input

  describe('connections', function() {
    //first let's make two nodes
    var node1, node2
    before(function() {
      node1 = new Node()
      node2 = new Node()
      node1.connect(node2, 'under some circumstance')
    })

    it('adds a connection to the node\'s connection array with #connect', function() {
      expect(node1.connections).to.have.length(1)
    })

    it('it routes properly with the correct input', function() {
      expect(node1.route('under some circumstance')).to.equal(node2)
    })

    it('doesn\'t route to any node if the condition doesn\'t match', function() {
      expect(node1.route('foobar')).to.be.undefined
    })

    it('does not allow multiple connections with the same condition', function() {
      node1.connect(node2, 'a')
      expect(function() {
        node1.connect(new Node(), 'a')
      }).to.throw(Error)

    })

  })

  // this next section should be taken AS A SUGGESTION
  // you don't NEED to impliment this to make the 
  // program work. However, it might help keep you 
  // organized. Then again, yolo.
  describe('helpers', function() {
    describe('getConnectionStrings', function() {
      // to run this test, take out the `x` in front of `it`
      it('returns an array of strings from the connection conditions', function() {
        var node1 = new Node()
        var node2 = new Node()
        var node3 = new Node()
        node1.connect(node2, 'a')
        node1.connect(node3, 'b')
        expect(node1.getConnectionStrings()).to.eql(['a','b'])
      })
    })

    describe('hasConnectionCondition', function() {
      it('determines when the condition has been regestered', function() {
        var node1 = new Node()
        var node2 = new Node()

        node1.connect(node2, 'foo')
        expect(node1.hasConnectionCondition('foo')).to.be.true
        expect(node1.hasConnectionCondition('bar')).to.be.false
      })
    })
  })


})

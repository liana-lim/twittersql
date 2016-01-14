describe('A queue', function() {
  var queue;

  beforeEach(function() {
    queue = new Queue();
  });

  it('has `enqueue`, `dequeue`, and `size` methods', function() {
    expect(queue.enqueue instanceof Function).toBeTruthy();
    expect(queue.dequeue instanceof Function).toBeTruthy();
    expect(queue.size instanceof Function).toBeTruthy();
  });

  it('has size 0 initially', function() {
    expect(queue.size()).toEqual(0);
  });

  it('increases in size when adding an item', function() {
    queue.enqueue('first in line');
    expect(queue.size()).toEqual(1);
  });

  it('decreases in size when removing an item', function() {
    queue.enqueue('first');
    queue.enqueue('second');
    queue.enqueue('third');
    queue.dequeue();
    expect(queue.size()).toEqual(2);
  });

  it('returns the correct item when dequeuing', function() {
    queue.enqueue('first');
    queue.enqueue('second');
    queue.enqueue('third');
    expect(queue.size()).toEqual(3);
    expect(queue.dequeue()).toEqual('first');
    expect(queue.size()).toEqual(2);
    expect(queue.dequeue()).toEqual('second');
    expect(queue.size()).toEqual(1);
    expect(queue.dequeue()).toEqual('third');
    expect(queue.size()).toEqual(0);
  });

  it('handles underflow properly, by returning undefined when empty', function() {
    queue.enqueue('first in line');
    expect(queue.size()).toEqual(1);
    expect(queue.dequeue()).toEqual('first in line');
    expect(queue.size()).toEqual(0);
    expect(queue.dequeue()).toEqual(undefined);
    expect(queue.size()).toEqual(0);
    expect(queue.dequeue()).toEqual(undefined);
    expect(queue.size()).toEqual(0);
  });

  it('handles interspersed enqueue and dequeue', function(){
    queue.enqueue(1);
    expect(queue.dequeue()).toBe(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.dequeue()).toBe(2);
    queue.enqueue(4);
    expect(queue.dequeue()).toBe(3);
    expect(queue.dequeue()).toBe(4);
    expect(queue.dequeue()).toBe(undefined);
  });

  it('adds and removes its own items', function(){
    var q2 = new Queue();
    queue.enqueue('fullstack');
    q2.enqueue('JavaScript');
    expect(q2.dequeue()).toBe('JavaScript');
    expect(q2.dequeue()).toBe(undefined);
    expect(queue.dequeue()).toBe('fullstack');
    expect(queue.dequeue()).toBe(undefined);
  });

});

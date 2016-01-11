// this file defines an actual game that will be played

var Game = require('./game')

var g = new Game()


g.addNode('direction', 'Welcome. Do you choose to go left, or right?')

g.addNode('leftResp', 'Ah, good choice. Good choice. Now what color is the best?')

g.addNode('rightResp', 'There be dragons there.')


g.addNode('yep', 'that is true')
g.addNode('wrong', 'you would be incorrect, friend')

g.connect('direction', 'leftResp', 'left')
g.connect('direction', 'rightResp', 'right')

g.connect('leftResp', 'yep', 'blue')
g.connect('leftResp', 'wrong', 'green')
g.connect('leftResp', 'wrong', 'red')

module.exports = g
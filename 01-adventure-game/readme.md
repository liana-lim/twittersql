# Choose your own adstackture


## Background
Today we’re going to build an *engine* to support “choose your own adventure” games. Writing this engine will give us practice building an object oriented piece of software. Let’s have a look at what playing a game with this engine looks like.

Before you do anything

* clone this repo to your computer
* run `npm install` from with in the folder

When we’re done with the project, you can play a game by running `node player`

## Example Game
```

Welcome. Do you choose to go left, or right
1) left
2) right
1

Ah, good choice. Good choice.
```

Had the adventurer said right, the game would have said “There be dragons there.”

Already we see that the game needs to support *branching*. It needs to respond to the user in different ways depending on what the user says.

## Example Game Source

Checkout `game.source.js` in the main folder for an example game. See if you can piece together what’s going on! Then, try drawing out the game graph!

## The State Machine

Systems like the one we’re building are often called _State Machines_. Some of you may have studied these in school. For your benefit, take a minute to watch [this video](https://www.youtube.com/watch?v=-Yicg2TTMPs).

## Test specs
To help you, we’ve written some test specs much like the ones you worked with in Test-First. You can run `npm test` to see the test suite run. To look at the specs, check out the `test` folder.

## Components

We’re going to build this engine with several suggested components. We’ve set up files for each one in this project. We also wired them up to talk to each other. Here are some notes about them.

- Node: A node is a single question or prompt. Not to be confused with the technology _node.js_ which we are also studying at Fullstack. This is particularly confusing because we have a file called `node.js` in this project, and because this project is _built_ in node.
- Connection: Connections are objects that represent the circumstances under which our game changes from one state to another. For the question “Would you like a cookie?” the connections might have the conditions “yes” and “no.”
- Game: The game is what holds everything together. Its the interface that a game programer would use to construct these games. It exposes methods like `addNode` and `connect`. It keeps track of all the nodes in a javascript object.
- Player: This is a component that is basically the “user interface” if we can call it that. It works with an npm package to present the current question to the user. 
- Game source: This is a file that uses the game class to build a game. 

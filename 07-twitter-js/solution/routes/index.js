'use strict';
var express = require('express');
var router = express.Router();
var tweetBank = require('../tweetBank');
var User = require('../../models/index.js').User;
var Tweet = require('../../models/index.js').Tweet;

module.exports = function makeRouterWithSockets (io) {

  // a reusable function
  // function respondWithAllTweets (req, res, next){
  //   var allTheTweets = tweetBank.list();
  //   res.render('index', {
  //     title: 'Twitter.js',
  //     tweets: allTheTweets,
  //     showForm: true
  //   });
  // }

  function respondWithAllTweets (req, res, next){
    User.findAll({ include: [Tweet] })
    .then(function(users){
      var allTheTweets = [];
      users.forEach(function(obj, i){
        var newObj = { name: obj.name};
        obj.Tweets.forEach(function(eachTweet){
          newObj.id = eachTweet.id;
          newObj.text = eachTweet.tweet;
        });
        allTheTweets.push(newObj);
      });
      res.render('index', {
        title: 'Twitter.js',
        tweets: allTheTweets,
        showForm: true
      });
    });

  }





  // here we basically treet the root view and tweets view as identical
  router.get('/', respondWithAllTweets);
  router.get('/tweets', respondWithAllTweets);

  // single-user page
  router.get('/users/:username', function(req, res, next){
    Tweet.findAll({ //tweet formatted Tweet - User, need username
        include:[{
          model: User,
          where: {name: 'Zeke'}
        }]
       }).then(function(bodyparse){
        var tweetsForName = [];
        console.log(bodyparse[0].dataValues.tweet);
          if(Array.isArray(bodyparse[0].dataValues)){
            bodyparse[0].dataValues.forEach(function(t){
              tweetsForName.push({text: t.tweet, name: req.params.username, id: t.id});
            });
          }else{
            tweetsForName.push({text: bodyparse[0].dataValues.tweet, name: req.params.username, id: bodyparse[0].dataValues.id });
          }
        res.render('index', {
          title: 'Twitter.js',
          tweets: tweetsForName,
          showForm: true,
          username: req.params.username
        });
    });
  });

  // single-tweet page
  router.get('/tweets/:id', function(req, res, next){
    User.findOne({
      include:[{
          model: Tweet,
          where: {id: req.params.id}
        }]
       }).then(function(bodyparse){
          var tweetsWithThatId = [];
          tweetsWithThatId.push({text: bodyparse.dataValues.Tweets[0].dataValues.tweet, id: bodyparse.dataValues.id, name: bodyparse.dataValues.name});




        res.render('index', {
          title: 'Twitter.js',
          tweets: tweetsWithThatId,
          showForm: true,
        });
    });
  });

  // create a new tweet
  router.post('/tweets', function(req, res, next){
    var newTweet = tweetBank.add(req.body.name, req.body.text);
    io.sockets.emit('new_tweet', newTweet);
    res.redirect('/');
  });

  // // replaced this hard-coded route with general static routing in app.js
  // router.get('/stylesheets/style.css', function(req, res, next){
  //   res.sendFile('/stylesheets/style.css', { root: __dirname + '/../public/' });
  // });

  return router;
}

// pull in the Sequelize library
var Sequelize = require('sequelize');
// create an instance of a database connection
// which abstractly represents our app's mysql database
var twitterjsDB = new Sequelize('twitterjs', 'root', null, {
    dialect: "mysql",
    port:    3306,
});

// open the connection to our database
twitterjsDB
  .authenticate()
  .catch(function(err) {
    console.log('Unable to connect to the database:', err);
  })
  .then(function() {
    console.log('Connection has been established successfully.');
  });

var Tweet = require('./tweet')(twitterjsDB);
var User = require('./user')(twitterjsDB);

// adds a UserId foreign key to the `Tweet` table
User.hasMany(Tweet);
Tweet.belongsTo(User);



// User.findOne()
// .then(function (user) {
//     // big old crazy object, but no name or 
//     // id anywhere in there
//     console.log(user); 
// });

// User.findOne()
// .then(function (user) {
//     // produces expected output. wat. 
//     console.log(user.name); 
// });

// User.findOne().then(function (user) {
//     console.log(user.get({plain: true}))
// });

// User.findOne().then(function (user) {
//     return user.get();
// })
// .then(function (tweets) {
//     JSON.stringify(tweets); // another way of just logging the plain old values
// });

// Tweet.findOne().then(function (tweet) {
//     return tweet.getUser();
// })
// .then(function (tweets) {
//     JSON.stringify(tweets); // another way of just logging the plain old values
// });

// User.findOne().then(function (user) {
//     return user.getTweet() = tweet.getUser();
// })
// .then(function (tweets) {
//     JSON.stringify(tweets); // another way of just logging the plain old values
// });

// Tweet.findTweetById = function(id){
// 	Tweet.findOne({where: {id: id }}).then(function(tweet){
// 		return tweet;
// 	});
// };

// Tweet.findOne({where: {id: 1 }}).then(function(tweet){ //find one tweet by ID
//     return tweet;
// 	});

// Tweet.findAll({ //tweet formatted Tweet - User, need username
//   include:[{
//     model: User,
//     where: {name: 'Zeke'}
//   }]
//  }).then(function(p){
//   return JSON.stringify(p);
// })

// User.findAll({ //tweet formatted User - Tweet, need the userID, but function takes username
//   include:[{
//     model: Tweet,
//     where: {userId: 1}
//   }]
//  }).then(function(p){
//   console.log(JSON.stringify(p));
// })


// User.findAll({where: {name: 'Zeke'}}).then(function(users){
//   console.log(JSON.stringify(users));
// });


// User.findAll({ include: [Tweet] }).then(function(users){ //find all tweets
// 	console.log(JSON.stringify(users));
//   return JSON.stringify(users);
// });


// User.findAll({ include: [Tweet] }).then(function(users){
//     var testStringParse = JSON.stringify(users);
//     var testBodyParse = JSON.parse(testStringParse);
//   var resultsArray = [];
//   testBodyParse.forEach(function(obj, i){
//     var newObj = { name: obj.name};
//     obj.Tweets.forEach(function(eachTweet){
//       newObj.id = eachTweet.id;
//       newObj.text = eachTweet.tweet;
//     });
//     resultsArray.push(newObj);
//   });
//   // console.log(resultsArray);
//   return resultsArray;
// });

// Tweet.findAll({ //tweet formatted Tweet - User, need username
//   include:[{
//     model: User,
//     where: {name: 'Zeke'}
//   }]
//  }).then(function(bodyparse){
//     bodyparse[0].dataValues.tweet;
//     bodyparse[0].dataValues.User.dataValues.name;
// })

module.exports = {
    User: User,
    Tweet: Tweet
};





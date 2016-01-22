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

Tweet.findOne({where: {id: 1 }}).then(function(tweet){
		return tweet;
	});

// User.findAll({ include: [Tweet] }).then(function(users){
//	console.log(JSON.stringify(users));
// });

module.exports = {
    User: User,
    Tweet: Tweet
};





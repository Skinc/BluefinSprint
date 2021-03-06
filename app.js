// npm install express rem
var rem = require('rem')
  , express = require('express')
  , path = require('path')

  var mongoose = require('mongoose');

/**
 * Express.
 */

var app = express();

app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('secret', process.env.SESSION_SECRET || 'terrible, terrible secret')
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser(app.get('secret')));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/spoton');
});

app.configure('development', function () {
  app.set('host', 'localhost:' + app.get('port'));
  app.use(express.errorHandler());
});

app.configure('production', function () {
  app.set('host', process.env.HOST);
});

/**
 * Setup Twitter.
 */

var twitter = rem.connect('twitter.com').configure({
  key: process.env.TWITTER_KEY,
  secret: process.env.TWITTER_SECRET
});


var oauth = rem.oauth(twitter, 'http://' + app.get('host') + '/oauth/callback');

app.get('/login/', oauth.login());

app.use(oauth.middleware(function (req, res, next) {
  console.log("The user is now authenticated.");
  res.redirect('/');
}));

app.get('/logout/', oauth.logout(function (req, res) {
  res.redirect('/');
}));

// Save the user session as req.user.
app.all('/*', function (req, res, next) {
  req.api = oauth.session(req);
  next();
});

/**
 * Routes
 */

function loginRequired (req, res, next) {
  if (!req.api) {
    res.redirect('/login/');
  } else {
    next();
  }
}

function uniqueSubSet(elements,set){
  var subSet = [];
  for (var i = 0; i < elements; i++){
    var element = randomChoice(set);
    while (subSet.indexOf(element) > -1){
      element = randomChoice(set);
    }
    subSet.push(element)
  }
  return subSet;
}

function randomChoice(list){
  var index = randInt(0,list.length-1);
  return list[index];
}

function randInt(min,max){
  return Math.floor(Math.random()*(max - min + 1))+min;
}

app.get('/', loginRequired, function (req, res) {
  req.api('account/verify_credentials').get(function (err, profile) {
    res.render("newsearch", {title: "n@io", page: 'newsearch'});
  });
});

app.get('/test', function (req, res) {
  res.render("newsearch", {title: "n@io", page: 'newsearch'});
})

app.post('/createsearch', function(req, res){
  // console.log(req.body)
  console.log("level 1")
  category = req.body.field;
  var tweets = Tweet.find().where('category').equals(category).where('score').gt(40).exec(function(err,tweets){
    console.log("level 2")
    if (err){
      console.log("error", err);   
    }
    tweets = uniqueSubSet(10, tweets);
    console.log(tweets)
    res.render('results',{title: 'n@io', page: "searches",tweets: tweets});
  })
})

app.get('/searches', loginRequired, function (req, res) {
  req.api('account/verify_credentials').get(function (err, profile) {
    var tweets = Tweet.find().where('category').equals("Technology").where('score').gt(40).exec(function(err,tweets){
      var tweets2 = Tweet.find().where('category').equals("Art").where('score').gt(40).exec(function(err,tweets2){
        if (err){
          console.log("error", err);   
        }
        tweets = uniqueSubSet(10,tweets);
        tweets2 = uniqueSubSet(10,tweets2)
        console.log(tweets);
        res.render('results',{title: 'n@io', tech: tweets, page:'searches', art: tweets2});
      })
    })
  });
});


app.post('/status', loginRequired, function (req, res) {
  req.api('statuses/update').post({
    status: req.body.status
  }, function (err, json) {
    if (err) {
      res.json({error: err});
    } else {
      res.redirect('http://twitter.com/' + json.user.screen_name + '/status/' + json.id_str);
    }
  });
})

app.listen(app.get('port'), function () {
  console.log('Listening on http://' + app.get('host'))
});


var tweetSchema = mongoose.Schema({
  category: String,
  text: String,
  influence: Number,
  score: Number,
  name: String,
  screen: String,
  url: String,
  id: Number,
});

var Tweet = mongoose.model('Tweet', tweetSchema);

/**
 * Streaming example
 */

var carrier = require('carrier');

app.get('/stream', loginRequired, function (req, res) {
  req.api.stream('statuses/filter').post({
    track: ['engineering', 'thanks obama']
  }, function (err, stream) {
    carrier.carry(stream, function (line) {
      var line = JSON.parse(line);
      res.write(line.text + '\n');
    });
  });
})



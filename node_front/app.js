
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');

var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/', routes.index);
app.post('/', function(req, res){
	//console.log(req.host);
	var url = 'http://'+req.host+':3000/hr/claims/verify';
	res.redirect(307, url);
	//res.cookie('name1', 'express');
	//res.cookie('name', 'express');
  //res.render('reimburse', { title: 'Express' });

});
app.post('/hrClaims2', routes.index2);
app.post('/approverClaims2', routes.index2);
// app.get('/:sessionId?', function(req, res){
// 	//console.log(req.body);
// 	res.cookie('sessionId', req.params.sessionId);
//   res.render('reimburse', { roleName: 'claim_manager' });

// });
app.get('/users', user.list);

var about = require('./routes/about');
app.get('/about', about.about);
app.get('/recruitResult', function(req,res){
	console.log(req.host);
	res.render('recruitResult',  {title: 'Express'});
});

app.get('/uploadResult', function(req,res){
	console.log(req.host);
	res.render('uploadResult',  {title: 'Express'});
});

var stationary = require('./routes/stationary');
app.get('/stationary', stationary.stationary);

var claims = require('./routes/claims');
app.get('/claims', claims.claims);
app.post('/claims', function(req, res){
	console.log(req.host);
	var url = 'http://'+req.host+':3000/claims/verify';
	res.redirect(307, url);
	//res.cookie('name1', 'express');
	//res.cookie('name', 'express');
  //res.render('reimburse', { title: 'Express' });

});
app.post('/approverClaims', claims.claims4);
app.get('/approverClaims', claims.claims5);
app.post('/claims2', claims.claims2);
app.get('/claims2', claims.claims3);
app.get('/quick', claims.claims6);


var claims = require('./routes/claims');
app.get('/finReimburse', claims.finReimburse);

// var cookieSession = require('cookie-session');
// app.use(cookieSession({
//   name: 'session',
//   keys: ['/* secret keys */'],

//   // Cookie Options
//   //maxAge: 24 * 60 * 60 * 1000 // 24 hours
// }));
var cookieParser = require('cookie-parser');
//app.use(cookieParser());
// app.get('/', function(req, res){
//    res.cookie('name', 'express').send('cookie set'); //Sets name = express
// });




http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

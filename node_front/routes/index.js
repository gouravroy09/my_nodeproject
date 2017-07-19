
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.cookie('name', 'express');
  res.render('reimburse', { title: 'Express' });

};

exports.index2 = function(req, res){
	console.log(req.body);
	res.cookie('sessionId', req.body.sessionId);
  res.render('reimburse', { roleName: req.body.roleName });

};
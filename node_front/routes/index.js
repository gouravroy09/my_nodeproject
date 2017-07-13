
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.cookie('name', 'express');
  res.render('reimburse', { title: 'Express' });

};
exports.claims = function(req, res){
	res.cookie('name', 'express');
  res.render('employeeClaims', { title: 'Express' });

};
exports.claims2 = function(req, res){
	console.log(req.body);
	res.cookie('name', 'express');
  res.render('employeeClaims', { title: 'Express' });

};
exports.finReimburse = function(req, res){
  res.render('fin_reimburse', { title: 'Express' });
};
exports.claims = function(req, res){
	res.cookie('name', 'express');
  res.render('employeeClaims', { title: 'Express' });

};
exports.finReimburse = function(req, res){
  res.render('fin_reimburse', { title: 'Express' });
};
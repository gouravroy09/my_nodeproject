exports.claims = function(req, res){
	res.cookie('sessionId', req.body.sessionId);

  res.render('employeeClaims',  {empId: '10000167'});

};
exports.claims2 = function(req, res){
	console.log(req.body);
	res.cookie('sessionId', req.body.sessionId);

  res.render('employeeClaims',  {empId: req.body.empId});

};
exports.claims3 = function(req, res){
	//console.log(req.body);
	//res.cookie('sessionId', req.body.sessionId);

  res.render('employeeClaims',  {title: 'Express'});

};
exports.finReimburse = function(req, res){
  res.render('fin_reimburse', { title: 'Express' });
};
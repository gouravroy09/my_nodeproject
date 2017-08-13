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
exports.claims4 = function(req, res){
	console.log(req.body);
	res.cookie('sessionId', req.body.sessionId);

  res.render('travel_approval',  {empId: req.body.empId});

};
exports.claims5 = function(req, res){
	console.log(req.body);
	res.cookie('sessionId', 'asdsadas');

  res.render('travel_approval',  {empId: '10000167'});

};
exports.finReimburse = function(req, res){
  res.render('fin_reimburse', { title: 'Express' });
};


function  updateTourDetails(tourId) {
   
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'emp_portal',
        password: 'P0rt@l',
        server: '115.124.113.186', 
        database: 'TestServerDB' 
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from TourDetails where TourId ='+ tourId, function (err, recordset) {
            
            if (err) console.log(err)

            var query_string = "insert into tour_details(tour_id,current_advance) values(?,?);";
        var TourDetails = recordset.recordset[i];
        db.query(query_string,[TourDetails.TourId,TourDetails.AdvAmount],function(err){
                if(err)
                {
                    res.end(error);
                }
                else
                {
                    res.end('success');
                }
            });

            // send records as a response
            //res.send(recordset);
            
        });
    });
    return;
}
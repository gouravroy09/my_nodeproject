var express = require('express');
var api = express();
var Custom2=require('../models/Custom');
var db=require('../dbconnection');
var xlsx = require('node-xlsx');
var fs  = require('fs');
var sql = require('mssql');


api.get('/users2', function (req, res) {
   
    //var sql = require("mssql");

    // config for your database
    var config = {
        user: 'emp_portal',
        password: 'P0rt@l',
        //server: '115.124.113.186', 
        server: '10.10.91.81', 
        database: 'emp_portal' 
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('update Users set FullName="Admin-Admin" where Id=1', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });
    sql.close();
});

api.get('/empTypes',function(req,res,next){
    var config = {
            user: 'emp_portal',
            password: 'P0rt@l',
            server: 'localhost', 
            database: 'emp_portal' 
        };
    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from tblEmpType', function (err, recordset) {
            
            if (err) console.log(err);

            // send records as a response
            //var i=0;
            //addEmpType(sql,res,recordset);
            //for(i=0;i<recordset.length;i++){
                /*if(i<recordset.length){

                Custom2.addUser(recordset[i],function(err,count){

                });
                }*/
            //}
            //res.send(recordset);
            
        });
    });

    sql.close();
    });

function addEmpType(sql,res,recordset){
    var query_string = "delete from employee_type;ALTER TABLE employee_type AUTO_INCREMENT = 1;";
    query_string = query_string + "insert into employee_type(description) values ";

    //if(i<recordset.recordset.length){
       // console.log(recordset.recordset.length);
        for(var i =0;i < recordset.recordset.length;i++){
            var User = recordset.recordset[i];
            query_string = query_string + "("+
            stringify(User.EmpType)+"),";

        }
        query_string = query_string.slice(0,-1);
       // query_string =query_string ;
        console.log(query_string);
    Custom2.addUser(query_string,function(err,count){
        if (err) console.log(err);
        res.send(recordset);
        sql.close();
        //addUser(res,i+1,recordset);
    });
    //}
    //else {
    //}
}

api.get('/grades',function(req,res,next){
    var config = {
            user: 'emp_portal',
            password: 'P0rt@l',
            server: 'localhost', 
            database: 'emp_portal' 
        };
    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from tblGrades', function (err, recordset) {
            
            if (err) console.log(err);

            // send records as a response
            //var i=0;
            addGrade(sql,res,recordset);
            //for(i=0;i<recordset.length;i++){
                /*if(i<recordset.length){

                Custom2.addUser(recordset[i],function(err,count){

                });
                }*/
            //}
            //res.send(recordset);
            
        });
    });

    //sql.close();
    });

function addGrade(sql,res,recordset){
    var query_string = "delete from employee_grade;ALTER TABLE employee_grade AUTO_INCREMENT = 1;"
    query_string = query_string + "insert into employee_grade(description) values ";

    //if(i<recordset.recordset.length){
       // console.log(recordset.recordset.length);
        for(var i =0;i < recordset.recordset.length;i++){
            var User = recordset.recordset[i];
            query_string = query_string + "("+
            stringify(User.Grade)+"),";

        }
        query_string = query_string.slice(0,-1);
       // query_string =query_string ;
        console.log(query_string);
    Custom2.addUser(query_string,function(err,count){
        if (err) console.log(err);
        res.send(recordset);
        sql.close();
        //addUser(res,i+1,recordset);
    });
    //}
    //else {
    //}
}



api.get('/users',function(req,res,next){
    var config = {
            user: 'emp_portal',
            password: 'P0rt@l',
            server: 'localhost', 
            database: 'emp_portal' 
        };
    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

           
        // query to the database and get the records
        request.query('select  tblGrades.Grade,UserName,FullName,EmailID,EmpNo,Doj,GradeCode,EmpType from Users left join tblGrades on Users.GradeCode=tblGrades.Id', function (err, recordset) {
            
            if (err) console.log(err);

            // send records as a response
            //var i=0;
            addUser(sql,res,recordset);

            console.log(recordset);
            //for(i=0;i<recordset.length;i++){
                /*if(i<recordset.length){

                Custom2.addUser(recordset[i],function(err,count){

                });
                }*/
            //}
            res.end(JSON.stringify (recordset));
            
        });
    });

    //sql.close();
    });


function addUser(sql,res,recordset){

    // var query_string = "insert into users(emp_grade_code,username,fullname,email_id,emp_no,doj,emp_grade_id,emp_type_id) "+
    // "values(?,?,?,?,?,?,?,?)";
    //     db.query(query_string,[req.body.GradeName,
    //         req.body.UserName,reqbody.FullName,req.body.EmailID,req.body.EmpNo,req.body.Doj,req.body.GradeCode,req.body.EmpType],function(err){
    //             if(err)
    //             {
    //                 res.end(error);
    //             }
    //             else
    //             {
    //                 res.end('success');
    //             }
    //         });





    var query_string = "delete from users;ALTER TABLE users AUTO_INCREMENT = 1;"
    query_string = query_string + "insert into users(emp_grade_code,username,fullname,email_id,emp_no,doj,emp_grade_id,emp_type_id) values";

    //if(i<recordset.recordset.length){
       // console.log(recordset.recordset.length);
        for(var i =0;i < recordset.recordset.length;i++){
            var User = recordset.recordset[i];
            query_string = query_string + "("+
            stringify(User.Grade) + "," + stringify(User.UserName)+","+stringify(User.FullName)+","+
            stringify(User.EmailID)+","+stringify(User.EmpNo)+","+
            stringify(User.Doj)+","+zeroGrade(User.GradeCode)+","+zeroGrade(User.EmpType)+"),";
        }
        query_string = query_string.slice(0,-1);
       // query_string =query_string ;
        console.log(query_string);
    Custom2.addUser(query_string,function(err,count){
        if (err) console.log(err);
        res.send(recordset);
        sql.close();
        //addUser(res,i+1,recordset);
    });
    //}
    //else {
    //}
}
function zeroGrade(object){
    if(object==null){
        return 0;
    }else{
        return object;
    }
}

function stringify(object){
    if(object==null){
        return "'its null'";
    }else{
        return "'"+object.toString()+"'";
    }
}

api.get('/rest/:id?',function(req,res,next){
    if(req.params.id){
        //Employee.getEmpTypeById(req.params.id){
            Custom2.getEmpTypeById(req.params.id,function(err,rows){
                if(err){
                    res.json(err);
                }else{
                    res.json(rows);
                }
            });
            //}
        }
        else{
            Custom2.getAllReimbursementTypes(function(err,rows){
                if(err){
                    res.json(err);
                }else{
                    res.json(rows);
                }
            });
        }
    });

api.get('/allUsers',function(req,res,next){
    
        //else{
            Custom2.getAllUsers(function(err,rows){
                if(err){
                    res.json(err);
                }else{
                    res.json(rows);
                }
            });
        //}
    });


api.get('/userreimburse/:id1?/:id2?',function(req,res,next){
    if(req.params.id1 && req.params.id2){
        //Employee.getEmpTypeById(req.params.id){
            Custom2.getReimburesmenTypeByEmpTypeAndGrade(req.params.id1,req.params.id2,function(err,rows){
                if(err){
                    res.json(err);
                }else{
                    res.json(rows);
                }
            });
            //}
        }
        else{
            Custom2.getAllReimbursementTypes(function(err,rows){
                if(err){
                    res.json(err);
                }else{
                    res.json(rows);
                }
            });
        }
    });
api.get('/reimbursehistory/:id?',function(req,res,next){
    //if(req.params.id){
        //Employee.getEmpTypeById(req.params.id){
            Custom2.getReimbursementHistoryByUserId(req.params.id,function(err,rows){
                if(err){
                    res.json(err);
                }else{
                    res.json(rows);
                }
            });
            //}
        //}
    });
api.get('/reimbursehistoryByApproverEmail/:id?',function(req,res,next){
    //if(req.params.id){
        //Employee.getEmpTypeById(req.params.id){
            Custom2.getReimbursementHistoryByApproverEmailId(req.params.id,function(err,rows){
                if(err){
                    res.json(err);
                }else{
                    res.json(rows);
                }
            });
            //}
        //}
    });
api.get('/employee_grades',function(req,res,next){
    //if(req.params.id){
        //Employee.getEmpTypeById(req.params.id){
            Custom2.getAllEmpGrades(function(err,rows){
                if(err){
                    res.json(err);
                }else{
                    res.json(rows);
                }
            });
            //}
        //}
    });

var cookieParser = require('cookie-parser');
api.use(cookieParser());
api.get('/pendingReimburseHistory',function(req,res,next){
  //console.log(req);
    //if(req.params.id){
        //Employee.getEmpTypeById(req.params.id){
          //console.log(req);
            Custom2.getReimbursementHistoyWithUserDetalsByStatus('pending',function(err,rows){
                if(err){
                    res.json(err);
                }else{
                    res.json(rows);
                }
            });
            //}
        //}
    });
api.get('/user/:id?',function(req,res,next){
    //if(req.params.id){
        //Employee.getEmpTypeById(req.params.id){
            Custom2.getUserById(req.params.id,function(err,rows){
                if(err){
                    res.json(err);
                }else{
                    res.json(rows);
                }
            });
            //}
        //}
    });

api.get('/userreimburse2/:id1?/:id2?/:id3?',function(req,res,next){
    //if(req.params.id1 && req.params.id2){
        //Employee.getEmpTypeById(req.params.id){
        	console.log("Request handler random was called.");
          res.writeHead(200, {"Content-Type": "application/json"});
 // var data = new Map();
 var xyz=[];
  //console.log(data);
  Custom2.getReimburesmenTypeByEmpTypeAndGrade(req.params.id1,req.params.id2,function(err,rows){
    if(err){
        res.json(err);
    }else{
                	//xyz.push(rows);
                	res.locals.row1 = rows;
                    //res.write(rows);
                }
            });
                	//console.log(data.get('rows1'));

            //}
      //  }
       // else{
       	//var rows2;
        Custom2.getReimbursementHistoryByUserId(req.params.id3,function(err,rows){
            if(err){
                res.json(err);
            }else{
                    
                   res.locals.row2 = rows;
               }
           });
           
    });

function checkSession(req,res){
    db.query(
                                'select value from miscellaneous where param = "' + req.body.sessionId + '";',function(err,data){
                                  //console.log('select email_id from users where id = ' +req.body.emp_id + ';');
                                  if(err)
                                    res.end(err);
                                  if(data[0]!=undefined)
                                  {
                                    var deserialized = new Date(Date.parse(data[0].value));
                                    var hours = Math.abs(new Date() - deserialized) / 36e5;
                                    if(hours>2)
                                      res.end('Session Expired!!');
                                    //var url = 'http://'+req.host+':5000/claims2';
                                    //res.redirect(307, url);
                                    //res.redirect()
                                  } else
                                  {
                                    db.query('insert into miscellaneous(param) values("'+req.body.sessionId+'");',function(err){
                                      if (err)
                                      {
                                        console.log(err);
                                        res.end('Login Again!!');
                                      }
                                    //var url = 'http://'+req.host+':5000/claims2';
                                    //res.redirect(307, url);
                                    });
                                  }
                                });
    return;
}

api.post('/approverTravelApproveReimburse',function(req,res,next){
  //var cookieString = req.params.id2;
  console.log(req.body);
  checkSession(req,res);
var config = {
            user: 'emp_portal',
            password: 'P0rt@l',
            //server: '115.124.113.186', 
            server: 'localhost',  
            database: 'emp_portal' 
        };
    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

           
        // query to the database and get the records
        console.log('update TourDetails set ClaimStatus=2 where TourId =' + req.body.tour_id);
        request.query('update TourDetails set ClaimStatus=2 where TourId =' + req.body.tour_id, function (err, recordset) {
            
            if (err) 
                {
                     sql.close();
                    console.log(err);
                }

            // send records as a response
            //var i=0;
            //addUser(sql,res,recordset);

            console.log(recordset);
            //for(i=0;i<recordset.length;i++){
                /*if(i<recordset.length){

                Custom2.addUser(recordset[i],function(err,count){

                });
                }*/
            //}
            //res.end(JSON.stringify (recordset));
            Custom2.claimIdsByTourId(req.body.tour_id,function(err,rows){

    if(err){
        res.json(err);
    }
    else{
        var query_param = '(';
        if(rows.length!=undefined){
            for(i=0;i<rows.length;i++){
                query_param = query_param + rows[i].id+ ',';
            }
            query_param = query_param.slice(0,-1) + ')';
        }
        
        Custom2.approvedByApproverReimbursementHistoryRowForTourId(query_param, function(err,count){
    if(err)
    {
      res.json(err);
  }
  else
  {
      //var from = 'a_mtyagi@eesl.co.in';
      var from = 'donotreply@eesl.co.in';
                    var to = 'a_mtyagi@eesl.co.in';
                    var subject = 'Claim Status : Approver Approved';
                    var text= '***This is an auto generated mail, please do not reply to this mail.***';
                    db.query(
                                'select email_id from users u inner join employee_reimbursement_history_with_rejects rh on rh.emp_id = u.id where rh.tour_id = ' +req.body.tour_id + '  limit 1;',function(err,data){
                                  //console.log('select email_id from users where id = ' +req.body.reimbursement_id + ';');
                                  if(err)
                                    res.end(err);
                                  sendMail(res,from,data[0].email_id,subject,text);
                                  //sendMail(res,from,req.body.approver_email,subject,text);
                    //return res.redirect(req.headers.referer);
                      var url = 'http://'+req.hostname+':5000/approverClaims';
                      //updateTourDetails(req.body.id);
                      sql.close();
                      res.redirect(307,url);
        
                                     
                                });

  }
});

    }
  
});
        });
    });
    //sql.close();

});

api.post('/hrTravelApproveReimburse',function(req,res,next){
  //var cookieString = req.params.id2;
  console.log(req.body);
  checkSession(req,res);
var config = {
            user: 'emp_portal',
            password: 'P0rt@l',
            //server: '115.124.113.186', 
            server: 'localhost',  
            database: 'emp_portal' 
        };
    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) 
        {
             sql.close();
            console.log(err);
        }

        // create Request object
        var request = new sql.Request();

           
        // query to the database and get the records
        console.log('update TourDetails set ClaimStatus=3 where TourId =' + req.body.tour_id);
        request.query('update TourDetails set ClaimStatus=3 where TourId =' + req.body.tour_id, function (err, recordset) {
            
            if (err) console.log(err);

            // send records as a response
            //var i=0;
            //addUser(sql,res,recordset);

            console.log(recordset);
            //for(i=0;i<recordset.length;i++){
                /*if(i<recordset.length){

                Custom2.addUser(recordset[i],function(err,count){

                });
                }*/
            //}
            //res.end(JSON.stringify (recordset));
            Custom2.claimIdsByTourId(req.body.tour_id,function(err,rows){

    if(err){
        res.json(err);
    }
    else{
        var query_param = '(';
        if(rows.length!=undefined){
            for(i=0;i<rows.length;i++){
                query_param = query_param + rows[i].id+ ',';
            }
            query_param = query_param.slice(0,-1) + ')';
        }
        
        Custom2.approvedByHrReimbursementHistoryRowForTourId(query_param, function(err,count){
    if(err)
    {
      res.json(err);
  }
  else
  {
      //var from = 'a_mtyagi@eesl.co.in';
      var from = 'donotreply@eesl.co.in';
                    var to = 'a_mtyagi@eesl.co.in';
                    var subject = 'Claim Status : HR-Reject - Amount/Frequency Mismatch';
                    var text= '***This is an auto generated mail, please do not reply to this mail.***';
                    db.query(
                                'select email_id from users u inner join employee_reimbursement_history_with_rejects rh on rh.emp_id = u.id where rh.tour_id = ' +req.body.tour_id + '  limit 1;',function(err,data){
                                  //console.log('select email_id from users where id = ' +req.body.reimbursement_id + ';');
                                  if(err)
                                    res.end(err);
                                  sendMail(res,from,data[0].email_id,subject,text);
                                  sendMail(res,from,req.body.approver_email,subject,text);
                    //return res.redirect(req.headers.referer);
                      var url = 'http://'+req.hostname+':5000/hrClaims2';
                      //updateTourDetails(req.body.id);
                      sql.close();
                      res.redirect(307,url);
        
                                     
                                });

  }
});

    }
  
});
        });
    });
//sql.close();

});



api.post('/hrapproveReimburse',function(req,res,next){
  //var cookieString = req.params.id2;
  console.log(req.body);
  checkSession(req,res);

  
  //db.query()
  Custom2.approvedByHrReimbursementHistoryRow(req.body.reimbursement_id,function(err,count){
    if(err)
    {
      res.json(err);
  }
  else
  {
      //var from = 'groy@eesl.co.in';
      var from = 'donotreply@eesl.co.in';
                    var to = 'groy@eesl.co.in';
                    var subject = 'Claim Status: HR-Approved';
                    var text= '***This is an auto generated mail, please do not reply to this mail.***';
                    db.query(
                                'select email_id from users u inner join employee_reimbursement_history_with_rejects rh on rh.emp_id = u.id where rh.id = ' +req.body.reimbursement_id + ';',function(err,data){
                                  console.log('select email_id from users where id = ' +req.body.reimbursement_id + ';');
                                  if(err)
                                    res.end(err);
                                  sendMail(res,from,data[0].email_id,subject,text);

                    //return res.redirect(req.headers.referer);
                      var url = 'http://'+req.hostname+':5000/hrClaims2';
                      res.redirect(307,url);
         
                                     
                                });

  }
});
});

var requestify = require('requestify');
api.post('/approverreject',function(req,res,next){
  //var cookieString = req.params.id2;
  checkSession(req,res);
  console.log(req.body);
  Custom2.claimIdsByTourId(req.body.tour_id,function(err,rows){

    if(err){
        res.json(err);
    }
    else{
        var query_param = '(';
        if(rows.length!=undefined){
            for(i=0;i<rows.length;i++){
                query_param = query_param + rows[i].id+ ',';
            }
            query_param = query_param.slice(0,-1) + ')';
        }
       var query =  "update employee_reimbursement_history set reject_reason='"+req.body.reject_reason + "',status='reject' where id in "+query_param+";";
          query =query +  "delete from  employee_reimbursement_history where id in "+query_param+";";
          console.log(query);
          db.query(query,function (err){
    if(err)
    {
      res.json(err);
  }
  else
  {
        var config = {
            user: 'emp_portal',
            password: 'P0rt@l',
            //server: '115.124.113.186', 
            server: 'localhost',  
            database: 'emp_portal' 
        };
    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

           
        // query to the database and get the records
        console.log('update TourDetails set ClaimStatus=Null where TourId =' + req.body.tour_id);
        request.query('update TourDetails set ClaimStatus=Null where TourId =' + req.body.tour_id, function (err, recordset) {
            
            if (err) 
                {
                     sql.close();
                    console.log(err);
                }

            // send records as a response
            //var i=0;
            //addUser(sql,res,recordset);

            console.log(recordset);



      //var from = 'a_mtyagi@eesl.co.in';
      var from = 'donotreply@eesl.co.in';
                    var to = 'a_mtyagi@eesl.co.in';
                    var subject = 'Claim Status : HR-Reject - Amount/Frequency Mismatch';
                    var text= '***This is an auto generated mail, please do not reply to this mail.***';
                    db.query(
                                'select email_id from users u inner join employee_reimbursement_history_with_rejects rh on rh.emp_id = u.id where rh.tour_id = ' +req.body.tour_id + '  limit 1;',function(err,data){
                                  //console.log('select email_id from users where id = ' +req.body.reimbursement_id + ';');
                                  if(err)
                                    res.end(err);
                                  sendMail(res,from,data[0].email_id,subject,text);
                    //return res.redirect(req.headers.referer);
                      var url = 'http://'+req.hostname+':5000/approverClaims';
                      res.redirect(307,url);
        
                                     
                                });
                     });
    });

  }
});

    }
  
});
});
api.post('/hrreject',function(req,res,next){
  //var cookieString = req.params.id2;
  checkSession(req,res);
  console.log(req.body);
  Custom2.claimIdsByTourId(req.body.tour_id,function(err,rows){

    if(err){
        res.json(err);
    }
    else{
        var query_param = '(';
        if(rows.length!=undefined){
            for(i=0;i<rows.length;i++){
                query_param = query_param + rows[i].id+ ',';
            }
            query_param = query_param.slice(0,-1) + ')';
        }
        
        var query =  "update employee_reimbursement_history set reject_reason='"+req.body.reject_reason + "',status='reject' where id in "+query_param+";";
          query =query +  "delete from  employee_reimbursement_history where id in "+query_param+";";
          console.log(query);
          db.query(query,function (err){
    if(err)
    {
      res.json(err);
  }
  else
  {
        var config = {
            user: 'emp_portal',
            password: 'P0rt@l',
            //server: '115.124.113.186', 
            server: 'localhost',  
            database: 'emp_portal' 
        };
    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

           
        // query to the database and get the records
        console.log('update TourDetails set ClaimStatus=Null where TourId =' + req.body.tour_id);
        request.query('update TourDetails set ClaimStatus=Null where TourId =' + req.body.tour_id, function (err, recordset) {
            
            if (err) 
                {
                     sql.close();
                    console.log(err);
                }

            // send records as a response
            //var i=0;
            //addUser(sql,res,recordset);

            console.log(recordset);


      //var from = 'a_mtyagi@eesl.co.in';
      var from = 'donotreply@eesl.co.in';
                    var to = 'a_mtyagi@eesl.co.in';
                    var subject = 'Claim Status : HR-Reject - Amount/Frequency Mismatch';
                    var text= '***This is an auto generated mail, please do not reply to this mail.***';
                    db.query(
                                'select email_id from users u inner join employee_reimbursement_history_with_rejects rh on rh.emp_id = u.id where rh.tour_id = ' +req.body.tour_id + '  limit 1;',function(err,data){
                                  //console.log('select email_id from users where id = ' +req.body.reimbursement_id + ';');
                                  if(err)
                                    res.end(err);
                                  sendMail(res,from,data[0].email_id,subject,text);
                    //return res.redirect(req.headers.referer);
                      var url = 'http://'+req.hostname+':5000/hrClaims2';
                      res.redirect(307,url);
        
                                     
                                });
                    });
    });
    sql.close();

  }
});

    }
  
});
});

// api.post('/hrreject',function(req,res,next){
//   //var cookieString = req.params.id2;
//   checkSession(req,res);
//   console.log(req.body);


//   Custom2.claimIdsByTourId(req.body.tour_id,function(err,rows){

//     if(err){
//         res.json(err);
//     }
//     else{
//         var query_param = '(';
//         if(rows.length!=undefined){
//             for(i=0;i<rows.length;i++){
//                 query_param = query_param + rows[i].id+ ',';
//             }
//             query_param = query_param.slice(0,-1) + ')';
//         }
//         console.log('reject_reason ' + req.body.reject_reason);
//          var query =  "update employee_reimbursement_history set reject_reason='"+req.body.reject_reason + "',status='hr-reject-amnt/freq-exceed' where id in "+query_param+";";
//           query =query +  "delete from  employee_reimbursement_history where id in "+query_param+";";
//           console.log(query);
//           db.query(query,function (err){
//             if(err)
//             {
//                 console.log(err);
//             }
//             else{
//                 var url = 'http://'+req.hostname+':5000/hrClaims2';
//                       res.redirect(307,url);
//             }
//           });
        
// //         Custom2.rejectedByHr(query_param,req.body.reject_reason, function(err,count){
// //     if(err)
// //     {
// //       res.json(err);
// //   }
// //   else
// //   {
        

// //   }
// // });

//     }
  
// });
// });

api.post('/hrrejectReimburse/amt-Freq-Mismatch',function(req,res,next){
  //var cookieString = req.params.id2;
  checkSession(req,res);
  Custom2.rejectedByHrAmtFreqMismatch(req.body.reimbursement_id,function(err,count){
    if(err)
    {
      res.json(err);
  }
  else
  {
      //var from = 'a_mtyagi@eesl.co.in';
      var from = 'donotreply@eesl.co.in';
                    var to = 'a_mtyagi@eesl.co.in';
                    var subject = 'Claim Status : HR-Reject - Amount/Frequency Mismatch';
                    var text= '***This is an auto generated mail, please do not reply to this mail.***';
                    db.query(
                                'select email_id from users u inner join employee_reimbursement_history_with_rejects rh on rh.emp_id = u.id where rh.id = ' +req.body.reimbursement_id + ';',function(err,data){
                                  console.log('select email_id from users where id = ' +req.body.reimbursement_id + ';');
                                  if(err)
                                    res.end(err);
                                  sendMail(res,from,data[0].email_id,subject,text);
                    //return res.redirect(req.headers.referer);
                      var url = 'http://'+req.hostname+':5000/hrClaims2';
                      res.redirect(307,url);
//                       requestify.post(url, {
//     sessionId: req.params.id2, roleName : 'claim_manager'
// })
// .then(function(response) {
//     // Get the response body (JSON parsed or jQuery object for XMLs)
//     //res.end();
//     res.redirect(307,url);
// });            
                                     
                                });
                    //sendMail(res,from,to,subject,text);
      //res.redirect(req.headers.referer);
  }
});
});
api.post('/hrrejectReimburse/docMismatch',function(req,res,next){
  //var cookieString = req.params.id2;
  checkSession(req,res);
  Custom2.rejectedByHrDocMismatch(req.body.reimbursement_id,function(err,count){
    if(err)
    {
      res.json(err);
  }
  else
  {
      //var from = 'groy@eesl.co.in';
      var from = 'donotreply@eesl.co.in';
                    var to = 'groy@eesl.co.in';
                    var subject = 'Claim Status : HR Reject - Document Mismatch';
                    var text= '***This is an auto generated mail, please do not reply to this mail.***';
                    db.query(
                                'select email_id from users u inner join employee_reimbursement_history_with_rejects rh on rh.emp_id = u.id where rh.id = ' +req.body.reimbursement_id + ';',function(err,data){
                                  console.log('select email_id from users where id = ' +req.body.reimbursement_id + ';');
                                  if(err)
                                    res.end(err);
                                  sendMail(res,from,data[0].email_id,subject,text);
                    //return res.redirect(req.headers.referer);
                      var url = 'http://'+req.hostname+':5000/hrClaims2';
                      res.redirect(307,url);
//                       requestify.post(url, {
//     sessionId: req.params.id2, roleName : 'claim_manager'
// })
// .then(function(response) {
//     // Get the response body (JSON parsed or jQuery object for XMLs)
//     //res.end();
//     res.redirect(307,url);
// });            
                                     
                                });
                    //sendMail(res,from,to,subject,text);
      //res.redirect(req.headers.referer);
  }
});
});

api.get('/finApproveReimburse/:id',function(req,res,next){
  Custom2.finApprovedByHrReimbursementHistoryRow(req.params.id,function(err,count){
    if(err)
    {
      res.json(err);
  }
  else
  {
      res.redirect(req.headers.referer);
  }
});
});

api.get('/getReimburesmenTypeByEmpTypeAndGrade/:id?',function(req,res,next){
    //if(req.params.id){
        //Employee.getEmpTypeById(req.params.id){
            Custom2.getReimburesmenTypeByEmpTypeAndGrade(req.params.id,function(err,rows){
                if(err){
                    res.json(err);
                }else{
                    res.json(rows);
                }
            });
            //}
        //}
    });


var nodeExcel = require('excel-export');
//var AdmZip = require('adm-zip');

//Check for the xlsx file in the project folder

//var zip = new AdmZip('./Report.xlsx');
//var themeXml = zip.readAsText("xl/theme/theme1.xml");
//var stylesXml = zip.readAsText("xl/styles.xml");
//var xlsx = require('node-xlsx');

//var obj = xlsx.parse(__dirname + '/myFile.xlsx'); // parses a file

//var obj = xlsx.parse(fs.readFileSync(__dirname + '/myFile.xlsx')); // parses a buffer
api.get('/Excel', function(req, res){
    var conf ={};
    //conf.stylesXmlFile = "styles.xml";
    conf.name = "mysheet";
    conf.cols = [
    {
        caption:'Business Transactions',
        type:'string',
        beforeCellWrite:function(row, cellData){
           return cellData.toUpperCase();
       },
       width:28.7109375
   },
   {
    caption:'Vendor',
    type:'string',
    beforeCellWrite:function(row, cellData){
       return cellData.toUpperCase();
   },
   width:28.7109375
},
{
    caption:'Document Date',
    type:'string',
    beforeCellWrite:function(row, cellData){
       return cellData.toUpperCase();
   },
   width:28.7109375
},
{
    caption:'2345',
    type:'number',
    beforeCellWrite:function(row, cellData){
       return cellData.toUpperCase();
   },
   width:28.7109375
},
{
    caption:'Posting Date',
    type:'date',
    beforeCellWrite:function(row, cellData){
       return cellData.toUpperCase();
   },
   width:28.7109375
},
{
    caption:'Amount',
    type:'number',
    beforeCellWrite:function(row, cellData){
       return cellData.toUpperCase();
   },
   width:28.7109375
},
{
    caption:'Currency',
    type:'string',
    beforeCellWrite:function(row, cellData){
       return cellData.toUpperCase();
   },
   width:28.7109375
},
{
    caption:'Tax Code',
    type:'string',
    beforeCellWrite:function(row, cellData){
       return cellData.toUpperCase();
   },
   width:28.7109375
},
{
    caption:'Tax Applicable',
    type:'string',
    beforeCellWrite:function(row, cellData){
       return cellData.toUpperCase();
   },
   width:28.7109375
},
{
    caption:'Business Place',
    type:'string',
    beforeCellWrite:function(row, cellData){
       return cellData.toUpperCase();
   },
   width:28.7109375
},
{
    caption:'Section Code',
    type:'string',
    beforeCellWrite:function(row, cellData){
       return cellData.toUpperCase();
   },
   width:28.7109375
},
{
    caption:'Test',
    type:'string',
    beforeCellWrite:function(row, cellData){
       return cellData.toUpperCase();
   },
   width:28.7109375
},
{
    caption:'GL Accoun NO',
    type:'string',
    beforeCellWrite:function(row, cellData){
       return cellData.toUpperCase();
   },
   width:28.7109375
},
{
    caption:'Amount',
    type:'number',
    beforeCellWrite:function(row, cellData){
       return cellData.toUpperCase();
   },
   width:28.7109375
},
{
    caption:'Tax Code',
    type:'string',
    beforeCellWrite:function(row, cellData){
       return cellData.toUpperCase();
   },
   width:28.7109375
},
{
    caption:'Tax Applicable',
    type:'string',
    beforeCellWrite:function(row, cellData){
       return cellData.toUpperCase();
   },
   width:28.7109375
},
{
    caption:'Busness Place',
    type:'string',
    beforeCellWrite:function(row, cellData){
       return cellData.toUpperCase();
   },
   width:28.7109375
},
{
    caption:'Sectio Code',
    type:'string',
    beforeCellWrite:function(row, cellData){
       return cellData.toUpperCase();
   },
   width:28.7109375
},
{
    caption:'Test',
    type:'string',
    beforeCellWrite:function(row, cellData){
       return cellData.toUpperCase();
   },
   width:28.7109375
},
{
    caption:'GL Accoun NO',
    type:'string',
    beforeCellWrite:function(row, cellData){
       return cellData.toUpperCase();
   },
   width:28.7109375
},
{
    caption:'Amount',
    type:'number',
    beforeCellWrite:function(row, cellData){
       return cellData.toUpperCase();
   },
   width:28.7109375
},
{
    caption:'Tax Code',
    type:'string',
    beforeCellWrite:function(row, cellData){
       return cellData.toUpperCase();
   },
   width:28.7109375
},
{
    caption:'Assignment No',
    type:'string',
    beforeCellWrite:function(row, cellData){
       return cellData.toUpperCase();
   },
   width:28.7109375
},
{
    caption:'Value Date',
    type:'string',
    beforeCellWrite:function(row, cellData){
       return cellData.toUpperCase();
   },
   width:28.7109375
},
{
    caption:'Narration',
    type:'string',
    beforeCellWrite:function(row, cellData){
       return cellData.toUpperCase();
   },
   width:28.7109375
},
{
    caption:'Cost Center',
    type:'string',
    beforeCellWrite:function(row, cellData){
       return cellData.toUpperCase();
   },
   width:28.7109375
},
    /*{
        caption:'string',
        type:'date',
        beforeCellWrite:function(row, cellData){
             return cellData.toUpperCase();
        },
        width:28.7109375
    },{
        caption:'date',
        type:'date',
        beforeCellWrite:function(){
            var originDate = new Date(Date.UTC(1899,11,30));
            return function(row, cellData, eOpt){
                if (eOpt.rowNum%2){
                    eOpt.styleIndex = 1;
                }  
                else{
                    eOpt.styleIndex = 2;
                }
                if (cellData === null){
                  eOpt.cellType = 'string';
                  return 'N/A';
                } else
                  return (cellData - originDate) / (24 * 60 * 60 * 1000);
            } 
        }()
    },{
        caption:'bool',
        type:'bool'
    },{
        caption:'number',
         type:'number'              
     }*/];



    /*conf.rows = [
        ['pi', new Date(Date.UTC(2013, 4, 1)), true, 3.14],
        ["e", new Date(2012, 4, 1), false, 2.7182],
        ["M&M<>'", new Date(Date.UTC(2013, 6, 9)), false, 1.61803],
        ["null date", null, true, 1.414]  
    ];
    */
    conf.rows = [];
    var result = nodeExcel.execute(conf);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
    res.end(result, 'binary');
});

api.get('/xyz',function(req,res,next){
    //import xlsx from 'node-xlsx';
// Or var xlsx = require('node-xlsx').default; 

// Parse a buffer
const data = [[1, 2, 3], [true, false, null, 'sheetjs'], ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
var buffer = xlsx.build([{name: "mySheetName", data: data}]);
res.send(buffer);

/*excelParser.worksheets({
  inFile: './Report.xlsx'
}, function(err, worksheets){
  if(err) console.error(err);
  console.log(worksheets);
});*/
    /*var status ='pending';
  Custom2.approvedByHrReimbursementHistoryRow(status,function(err,rows){
    if(err)
    {
      res.json(err);
    }
    else
    {
        console.log(rows);
      res.send(rows);
    }
});*/
});
var Employee=require('../models/Employee');

api.get('/testNew/:id?',function(req,res,next){
    if(req.params.id){
        //Employee.getEmpTypeById(req.params.id){
            Employee.getEmpTypeById(req.params.id,function(err,rows){
                if(err){
                    res.json(err);
                }else{
                    res.json(rows);
                }
            });
            //}
        }
        else{
            Employee.getAllReimbursementTypes(function(err,rows){
                if(err){
                    res.json(err);
                }else{
                    res.json(rows);
                }
            });
        }
    });


api.post('/delete/:id',function(req,res,next){
        //console.log(req.body);

        Employee.deleteReimbursement(req.params.id,function(err,count){

            if(err)
            {
                res.json(err);
            }
            else
            {
                //res.redirect('http://localhost:5000/#about');
                res.end('{"success" : "Updated Successfully", "status" : 200}');
                //res.redirect(req.headers.referer);
            }

        });
    });

var jsreport = require('jsreport');
api.get('/viewUnbilledRimburseHistory',function(req,res,next){
    Custom2.getReimbursementHistoryForBilling(function(err,rows){

            if(err)
            {
                res.json(err);
            }
            else
            {
                //var html = fs.readFile('./views/index.jade');
                var html = invoiceHTML(rows);
                res.end(html);
            }
        });
});

function invoiceHTML(rows){
     var html = '';
                    var date=new Date();
                if(rows.length>0){
                    html +='<h1>Expense Summary</h1>';
                html +='Date :' + date.toLocaleDateString();    
                html+='<table><tr><th>Project Code</th><th>Claim Type</th><th>Claim Amount</th><th>Count</th></tr>';
                for(i=0;i<rows.length;i++){
                    html+='<tr><td>'+rows[i].project_code+'</td><td>'+rows[i].description+'</td><td>'+
                        rows[i].reimbursement_amount+'</td><td>'+rows[i].count+'</td></tr>';
                }}
                return html;


}


api.post('/unBilledReimburseHistoy',function(req,res,next){
        //console.log('asdasdasdasdasdsadas');

        Custom2.getReimbursementHistoryForBilling(function(err,rows){

            if(err)
            {
                res.json(err);
            }
            else
            {
                var invoice_rows =rows;
                Custom2.getReimbursementHistoryIdsForBilling(function(err,rows){
                    if(err)
                    {
                        res.json(err);
                    }
                    else{
                        var update_rows = rows;
                        var date=new Date();
                        //var html = fs.readFile('./views/index.jade');
                        var html = invoiceHTML(invoice_rows);

                        jsreport.render({ template: { content: html/*fs.readFileSync('./views/index.html' ,'utf8')*/, engine: 'jsrender', recipe: 'phantom-pdf' } }).then(function(out) {
                            //out.stream.pipe(res);
                            var month = date.getMonth() +1;
                            var pdfname = "Date-"+date.getDate() +"-"+month+"-"+date.getFullYear()+"-Time-"+date.getHours()+":"+date.getMinutes()+'.pdf';
                             out.result.pipe(fs.createWriteStream('./node_back/nodejsrestapi/Images/'+pdfname));
                             saveInvoice(update_rows,pdfname,function(err,count){
                                if(err){
                                    res.end(err);
                                }else{
                                    res.redirect(307,req.headers.referer+'#services');
                                }
                             })
                             //res.redirect(req.headers.referer);
                        }).catch(function(e) {    
                            res.end(e.message);
                        });
                        //}

                        /*require("jsreport").render("<h1>Hi there!</h1>").then(function(out) {
          out.result.pipe(fs.createWriteStream('helloworld.pdf'));
        });*/





                        //res.redirect('http://localhost:5000/#about');
                        //res.end('{"success" : "Updated Successfully", "status" : 200}');
                        //res.redirect(req.headers.referer);
                        //res.json(rows);
                    }
                    
                });
            }

        });
    });

function saveInvoice(update_rows,link,callback){
    var update_query='update employee_reimbursement_history set bill_generated="yes" where id in (';
    for(var i=0;i<update_rows.length;i++){
        update_query=update_query + update_rows[i].id +',';

    }
    update_query = update_query.slice(0,-1);
    update_query=update_query +');';
    
    update_query = update_query +'insert into miscellaneous2(param,value) values("invoice","'+link+'");';
    //update_query = update_query + 'commit;';
    console.log(update_query);
    return db.query(update_query,callback);
    //function(link,callback){
    //return db.query("insert into miscellaneous(param,value) values('invoice',?)",[link],callback);
    //}
}
var cors=require('cors');
api.use(cors());
var bodyParser = require('body-parser');
api.use(bodyParser.json({limit: '50mb'}));

api.post('/saveSession',function(req,res,next){
        console.log(req.body);

        save_query = 'insert into miscellaneous(param,value) values("session'+req.body.session+'","'+req.body.session+'");';

        console.log(save_query);
        return db.query(save_query,function(err){
          if(err) res.end(err);
          res.end('success');
        });
    });
api.post('/deleteSession',function(req,res,next){
        console.log(req.body);
        delete_query= 'delete from miscellaneous where param="session'+req.body.session+'"';
        console.log(delete_query);
        return db.query(delete_query,function(err){
          if(err) res.end(err);
          res.end('success');
        });
    });

api.get('/invoice',function(req,res,next){
        //Employee.getEmpTypeById(req.params.id){
            Custom2.getInvoices(function(err,rows){
                if(err){
                    res.json(err);
                }else{
                    res.json(rows);
                }
            });
            //}
});


api.get('/projectCodes',function(req,res,next){
    //if(req.params.id){
        //Employee.getEmpTypeById(req.params.id){
            Custom2.getProjectCodes(function(err,rows){
                if(err){
                    res.json(err);
                }else{
                    res.json(rows);
                }
            });
            //}
        //}
    });

var nodemailer = require('nodemailer');



function sendMail(res,from,to,subject,text){
  var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'donotreply@eesl.co.in',
    pass: 'Eesl@1234'
  }
});

var mailOptions = {
  from: from,
  to: to,
  subject: subject,
  text: text
};
  transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    res.end(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
}); 
  return;

}

api.post('/addUser',function(req,res,next){
        console.log(req.body);
        //res.end('success');


//var query_string = "delete from users;ALTER TABLE users AUTO_INCREMENT = 1;"
    var query_string =   "insert into users(emp_grade_code,username,fullname,email_id,emp_no,doj,emp_grade_id,emp_type_id) values";

    //if(i<recordset.recordset.length){
       // console.log(recordset.recordset.length);
        //for(var i =0;i < recordset.recordset.length;i++){
            //var User = recordset.recordset[i];
            query_string = query_string + "("+
            stringify(req.body.GradeName) + "," + stringify(req.body.UserName)+","+stringify(req.body.FullName)+","+
            stringify(req.body.EmailID)+","+stringify(req.body.EmpNo)+","+
            stringify(req.body.Doj)+","+zeroGrade(req.body.GradeCode)+","+zeroGrade(req.body.EmpType)+")";
        //}
        //query_string = query_string.slice(0,-1);
       // query_string =query_string ;
        console.log(query_string);

    
        db.query(query_string,function(err){
                if(err)
                {
                    res.end(error);
                }
                else
                {
                    res.end('success');
                }
            });
    
    });

api.post('/updateUser',function(req,res,next){
         console.log(req.body);
        //res.end('success');
        db.query('select id,role from users where emp_no="'+req.body.EmpNo+'"',function(err,result){
            if(err){
                res.end(err);
            }
            else{
                if(result[0].id!=undefined){



                    var query_string =   "replace into users(id,emp_grade_code,username,fullname,email_id,emp_no,doj,role,emp_grade_id,emp_type_id) values";

    //if(i<recordset.recordset.length){
       // console.log(recordset.recordset.length);
        //for(var i =0;i < recordset.recordset.length;i++){
            //var User = recordset.recordset[i];
            query_string = query_string + "("+result[0].id+ "," +
            stringify(req.body.GradeName) + "," + stringify(req.body.UserName)+","+stringify(req.body.FullName)+","+
            stringify(req.body.EmailID)+","+stringify(req.body.EmpNo)+","+
            stringify(req.body.Doj)+","+stringify(result[0].role)+","+zeroGrade(req.body.GradeCode)+","+zeroGrade(req.body.EmpType)+")";
        //}
        //query_string = query_string.slice(0,-1);
       // query_string =query_string ;
        console.log(query_string);



    //                 var query_string = "replace into users(id,emp_grade_code,username,fullname,email_id,emp_no,doj,emp_grade_id,emp_type_id) "+
    // "values(?,?,?,?,?,?,?,?,?)";
        db.query(query_string,function(err){
                if(err)
                {
                    res.end(error);
                } 
                else
                {
                    res.end('success'); 
                }
            });
                }
            }
        });
    
    });



// api.get('/send_mail',function(req,res,next){
//     //if(req.params.id){
//         //Employee.getEmpTypeById(req.params.id){
            
//             //}
//         //}
//         sendMail();
//     });

api.post('/report',function(req,res){
    //import xlsx from 'node-xlsx';
// Or var xlsx = require('node-xlsx').default; 

// Parse a buffer
console.log(req.body);
// const data = [[1, 2, 3], [true, false, null, 'sheetjs'], ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
// var buffer = xlsx.build([{name: "mySheetName", data: data}]);
// res.send(buffer);

/*excelParser.worksheets({
  inFile: './Report.xlsx'
}, function(err, worksheets){
  if(err) console.error(err);
  console.log(worksheets);
});*/
    //var status ='pending';
  Custom2.getReimbursementHistoyWithUserDetalsByDateRange(req.body.from,req.body.to,function(err,rows){
    if(err)
    {
      res.json(err);
    }
    else
        //console.log(rows);
    {
        var conf={};
        conf.rows = [];
        if(rows.length!=undefined){
            
            conf.cols=[{
                caption:'tour_id',
                type:'number',
                width:50
            },{
            caption:'reimbursement_amount',
            type:'number',
            width:50
        },
        {
            caption:'time',
            type:'string',
            width:50
        },
        {
            caption:'status',
            type:'string',
            width:50
        },
        {
            caption:'bill_generated',
            type:'string',
            width:15
        },
        {
            caption:'project_code',
            type:'string',
            width:15
        },
        {
            caption:'fullname',
            type:'string',
            width:15
        },
        {
            caption:'emp_no',
            type:'string',
            width:15
        },
        {
            caption:'doj',
            type:'string',
            width:15
        },
        {
            caption:'emp_grade_code',
            type:'string',
            width:15
        },
        {
            caption:'reimbursement_description',
            type:'string',
            width:15
        },
        {
            caption:'emp_type_description',
            type:'string',
            width:15
        }
        ];
        var arr =[];
        for(i=0;i<rows.length;i++){
  //          var t = rows[i].time.toString.split(/[- :]/);

// Apply each element to the Date function
//var d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
//console.log(d);
            a=[rows[i].tour_id,rows[i].reimbursement_amount,rows[i].time,rows[i].status,rows[i].bill_generated!=null?rows[i].bill_generated:"",
                rows[i].project_code,rows[i].fullname,rows[i].emp_no,rows[i].doj,rows[i].emp_grade_code,
                rows[i].reimbursement_description,rows[i].emp_type_description];
            arr.push(a);
        }
        conf.rows = arr;
        console.log(arr);
        }
        //console.log(conf.rows);
        conf.name = "mysheet";
    var result = nodeExcel.execute(conf);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
    res.end(result, 'binary');
        //console.log(rows);
         //var buffer = xlsx.build([{name: "mySheetName", data: rows}]);
         //res.send(buffer);
    }
});
});




api.post('/report2',function(req,res){
    //import xlsx from 'node-xlsx';
// Or var xlsx = require('node-xlsx').default; 

// Parse a buffer

// const data = [[1, 2, 3], [true, false, null, 'sheetjs'], ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
// var buffer = xlsx.build([{name: "mySheetName", data: data}]);
// res.send(buffer);

/*excelParser.worksheets({
  inFile: './Report.xlsx'
}, function(err, worksheets){
  if(err) console.error(err);
  console.log(worksheets);
});*/
    //var status ='pending';
    var config = {
            user: 'emp_portal',
            password: 'P0rt@l',
            server: '115.124.113.186', 
            database: 'emp_portal' 
        };
    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        
        request.query('select u.FullName,u.EmpNo,,u.ReportingTo,u.Post,u.PostedAt,t.ToAddress,t.PeriodFrom,t.PeriodTo,t.Purpose from TourDetails t inner join Users u on t.UserId = u.Id', function (err, recordset){
    if(err)
    {
      res.json(err);
    }
    else
        
    {
        console.log(recordset);
        var conf={};
        conf.rows = [];
        if(rows.length!=undefined){
            
            conf.cols=[{
                caption:'FullName',
                type:'number',
                width:50
            },{
            caption:'EmpNo',
            type:'string',
            width:50
        },
        {
            caption:'ReportingTo',
            type:'string',
            width:50
        },
        {
            caption:'Post',
            type:'string',
            width:50
        },
        {
            caption:'PostedAt',
            type:'string',
            width:50
        },
        {
            caption:'ToAddress',
            type:'string',
            width:15
        },
        {
            caption:'PeriodFrom',
            type:'string',
            width:15
        },
        {
            caption:'PeriodTo',
            type:'string',
            width:15
        },
        {
            caption:'Purpose',
            type:'string',
            width:15
        }
        // ,
        // {
        //     caption:'doj',
        //     type:'string',
        //     width:15
        // },
        // {
        //     caption:'emp_grade_code',
        //     type:'string',
        //     width:15
        // },
        // {
        //     caption:'reimbursement_description',
        //     type:'string',
        //     width:15
        // },
        // {
        //     caption:'emp_type_description',
        //     type:'string',
        //     width:15
        // }
        ];
        var arr =[];
        for(i=0;i<rows.length;i++){
  //          var t = rows[i].time.toString.split(/[- :]/);

// Apply each element to the Date function
//var d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
//console.log(d);
            a=[rows[i].FullName,rows[i].EmpNo,rows[i].ReportingTo,rows[i].Post,rows[i].PostedAt,rows[i].ToAddress!=null?rows[i].bill_generated:"",
                rows[i].PeriodFrom,rows[i].PeriodTo,rows[i].Purpose
                // ,rows[i].doj,rows[i].emp_grade_code,
                // rows[i].reimbursement_description,rows[i].emp_type_description
                ];
            arr.push(a);
        }
        conf.rows = arr;
        console.log(arr);
        }
        //console.log(conf.rows);
        conf.name = "mysheet";
    var result = nodeExcel.execute(conf);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
    res.end(result, 'binary');
        //console.log(rows);
         //var buffer = xlsx.build([{name: "mySheetName", data: rows}]);
         //res.send(buffer);
    }
});
    });

    sql.close();
  
});


function  updateTourDetails(tourId) {
  var config = {
            user: 'emp_portal',
            password: 'P0rt@l',
            server: '115.124.113.186', 
            database: 'emp_portal_test' 
        };
    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

           
        // query to the database and get the records
        request.query('update TourDetails set ClaimStatus=2 where TourId =' +tourId, function (err, recordset) {
            
            if (err) console.log(err);

            // send records as a response
            //var i=0;
            //addUser(sql,res,recordset);

            console.log(recordset);
            //for(i=0;i<recordset.length;i++){
                /*if(i<recordset.length){

                Custom2.addUser(recordset[i],function(err,count){

                });
                }*/
            //}
            res.end(JSON.stringify (recordset));
            
        });
    });

    //sql.close();
    sql.close();
    return;
}

var form_counter =1;
api.get('/formDetails/:id1?',function(req,res,next){
    var config = {
            user: 'emp_portal',
            password: 'P0rt@l',
            server: 'localhost', 
            database: 'emp_portal' 
        };
    // connect to your database
    db.query('select code from employee_code where code="'+req.params.id1+'"',function(err,result){
        if(err){
            res.end(err);
        }
        if(result.length==0){
            res.end("Employee record not found!!");
        }
        else{
                //console.log(result.length);
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

           
        // query to the database and get the records
        request.query("select  tblDept.Name as Dept,Post, tblGrades.Grade,UserName,FullName,EmailID,EmpNo,Doj,GradeCode,tblEmpType.EmpType EmpType from Users left join tblGrades on Users.GradeCode=tblGrades.Id left join tblDept on tblDept.Id = Users.DeptId left join tblEmpType on tblEmpType.Id=Users.EmpType where Users.EmpNo='"+req.params.id1+"' ", function (err, recordset) {
            
            if (err) console.log(err);
            console.log(recordset);
            var User = recordset.recordset[0];
            // send records as a response
            //var i=0;
            //addUser(sql,res,recordset);
        //     for(var i =0;i < recordset.recordset.length;i++){
        //     var User = recordset.recordset[i];
        //     query_string = query_string + "("+
        //     stringify(User.Grade) + "," + stringify(User.UserName)+","+stringify(User.FullName)+","+
        //     stringify(User.EmailID)+","+stringify(User.EmpNo)+","+
        //     stringify(User.Doj)+","+zeroGrade(User.GradeCode)+","+zeroGrade(User.EmpType)+"),";
        // }
        sql.close();
        ++form_counter;
        console.log("counter value : " + form_counter);
        if(form_counter%3==1){
            var form_prefilled_url ="https://docs.google.com/forms/d/e/1FAIpQLSckoQMs3f4sGJW4xc2Rbln6w34ixiBdkxl8ejGUqZ9QoJYsbg/viewform?usp=pp_url&entry.1663611951="+User.FullName+
            "&entry.298139035="+User.EmpNo+"&entry.1709444462="+User.Dept
            +"&entry.851106813="+User.Post+"&entry.1162594645="+User.EmpType + "&entry.1418799842=" + User.EmailID;
            res.redirect(form_prefilled_url);
        }else if(form_counter%3==2){
            var form_prefilled_url2 ="https://docs.google.com/forms/d/e/1FAIpQLSdNShQNSTq1QLKFSMg6Mo2eBBPTr1NuKgnlcC2raqUBmN7dvA/viewform?usp=pp_url&entry.1663611951="+User.FullName+
            "&entry.298139035="+User.EmpNo+"&entry.1709444462="+User.Dept
            +"&entry.851106813="+User.Post+"&entry.1162594645="+User.EmpType + "&entry.1418799842=" + User.EmailID;
            res.redirect(form_prefilled_url2);
        } else {
            var form_prefilled_url3 ="https://docs.google.com/forms/d/e/1FAIpQLSc-AZOkqlmioFG8tnzaZFop2780fVfUNTzRy71xAZQG8kgmyg/viewform?usp=pp_url&entry.1663611951="+User.FullName+
            "&entry.298139035="+User.EmpNo+"&entry.1709444462="+User.Dept
            +"&entry.851106813="+User.Post+"&entry.1162594645="+User.EmpType + "&entry.1418799842=" + User.EmailID;
            res.redirect(form_prefilled_url3);
        }
            

            
            

            //for(i=0;i<recordset.length;i++){
                /*if(i<recordset.length){

                Custom2.addUser(recordset[i],function(err,count){

                });
                }*/
            //}
            //res.end(JSON.stringify (recordset));
            
        });
    });

        }
    
});
    //sql.close();
    });




api.get('/formDetails2/:id1?',function(req,res,next){
    var config = {
            user: 'emp_portal',
            password: 'P0rt@l',
            server: 'localhost', 
            database: 'emp_portal' 
        };
    // connect to your database
    //db.query('select code from employee_code where code="'+req.params.id1+'"',function(err,result){
        // if(err){
        //     res.end(err);
        // }
        // if(result.length==0){
        //     res.end("Employee record not found!!");
        // }
        // else{
                //console.log(result.length);
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

           
        // query to the database and get the records
        request.query("select  tblDept.Name as Dept,Post,MobileNo, tblGrades.Grade,UserName,FullName,EmailID,EmpNo,Doj,GradeCode,tblEmpType.EmpType EmpType from Users left join tblGrades on Users.GradeCode=tblGrades.Id left join tblDept on tblDept.Id = Users.DeptId left join tblEmpType on tblEmpType.Id=Users.EmpType where Users.EmpNo='"+req.params.id1+"' ", function (err, recordset) {
            
            if (err) console.log(err);
            console.log(recordset);
            var User = recordset.recordset[0];
            
        sql.close();
        //++form_counter;
        //console.log("counter value : " + form_counter);
        //if(form_counter%3==1){
            var form_prefilled_url ="https://docs.google.com/forms/d/e/1FAIpQLSeT6cu2r59nglPxEsqCsm04WFivmh2ZnqfTrid8r3Q6VpjlMA/viewform?usp=pp_url&entry.1564158472="+User.FullName+
            "&entry.964875694="+User.Post+"&entry.2076287349="+User.EmpNo
            +"&entry.1864424525="+User.Grade+"&entry.406599046="+User.Dept+"&entry.325595893="+User.MobileNo;
            res.redirect(form_prefilled_url);
        //}else if(form_counter%3==2){
            // var form_prefilled_url2 ="https://docs.google.com/forms/d/e/1FAIpQLSdNShQNSTq1QLKFSMg6Mo2eBBPTr1NuKgnlcC2raqUBmN7dvA/viewform?usp=pp_url&entry.1663611951="+User.FullName+
            // "&entry.298139035="+User.EmpNo+"&entry.1709444462="+User.Dept
            // +"&entry.851106813="+User.Post+"&entry.1162594645="+User.EmpType + "&entry.1418799842=" + User.EmailID;
            // res.redirect(form_prefilled_url2);
        //} else {
            // var form_prefilled_url3 ="https://docs.google.com/forms/d/e/1FAIpQLSc-AZOkqlmioFG8tnzaZFop2780fVfUNTzRy71xAZQG8kgmyg/viewform?usp=pp_url&entry.1663611951="+User.FullName+
            // "&entry.298139035="+User.EmpNo+"&entry.1709444462="+User.Dept
            // +"&entry.851106813="+User.Post+"&entry.1162594645="+User.EmpType + "&entry.1418799842=" + User.EmailID;
            // res.redirect(form_prefilled_url3);
        //}
            
            
        });
    });

        //}

//});
    //sql.close();
    });



module.exports = api

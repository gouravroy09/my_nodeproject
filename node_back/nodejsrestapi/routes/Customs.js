var express = require('express');
var api = express();
var Custom2=require('../models/Custom');
var db=require('../dbconnection');

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
    if(req.params.id){
        //Employee.getEmpTypeById(req.params.id){
            Custom2.getReimbursementHistoryByUserId(req.params.id,function(err,rows){
                if(err){
                    res.json(err);
                }else{
                    res.json(rows);
                }
            });
            //}
        }
    });
api.get('/user/:id?',function(req,res,next){
    if(req.params.id){
        //Employee.getEmpTypeById(req.params.id){
            Custom2.getUserById(req.params.id,function(err,rows){
                if(err){
                    res.json(err);
                }else{
                    res.json(rows);
                }
            });
            //}
        }
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
                    //res.write(rows);
                   //res.write(rows);
                   //xyz.push(rows);
                   res.locals.row2 = rows;
                }
            });
            //console.log(res.local.rows1);
            /*var json = JSON.stringify({
            	result : data
            });*/
            //console.log(json);
            //res.end();
        //}
    });

api.get("/", function(req, res){
  res.send('<ul>'
    + '<li>Download <a href="/amazing.txt">amazing.txt</a>.</li>'
    + '<li>Download <a href="/missing.txt">missing.txt</a>.</li>'
    + '</ul>');
});

// /files/* is accessed via req.params[0]
// but here we name it :file
api.get('/:file(*)', function(req, res, next){
  var file = req.params.file
    , path = __dirname + '/Images/' + file;

  res.download(path);
});


module.exports = api
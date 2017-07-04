var express = require('express');
var api = express();
var Custom2=require('../models/Custom');
var db=require('../dbconnection');
var xlsx = require('node-xlsx');
var fs  = require('fs');
const sql = require('mssql');


api.get('/users2', function (req, res) {
   
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
        request.query('select * from Users limit 1', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });
});

api.get('/empTypes',function(req,res,next){
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
        request.query('select * from tblEmpType', function (err, recordset) {
            
            if (err) console.log(err);

            // send records as a response
            //var i=0;
            addEmpType(sql,res,recordset);
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
            server: '115.124.113.186', 
            database: 'emp_portal_test' 
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
            server: '115.124.113.186', 
            database: 'emp_portal_test' 
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

            //console.log(recordset);
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


function addUser(sql,res,recordset){

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
api.get('/pendingReimburseHistory',function(req,res,next){
    //if(req.params.id){
        //Employee.getEmpTypeById(req.params.id){
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

/*api.get("/", function(req, res){
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
});*/

api.get('/hrapproveReimburse/:id',function(req,res,next){
  Custom2.approvedByHrReimbursementHistoryRow(req.params.id,function(err,count){
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

api.get('/hrrejectReimburse/amt-Freq-Mismatch/:id',function(req,res,next){
  Custom2.rejectedByHrAmtFreqMismatch(req.params.id,function(err,count){
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
api.get('/hrrejectReimburse/docMismatch/:id',function(req,res,next){
  Custom2.rejectedByHrDocMismatch(req.params.id,function(err,count){
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
                    html +='<h1>Invoice</h1>';
                html +='Date :' + date.toLocaleDateString();    
                html+='<table><tr><th>Project Code</th><th>Claim Type</th><th>Claim Amount</th><th>Count</th></tr>';
                for(i=0;i<rows.length;i++){
                    html+='<tr><td>'+rows[i].project_code+'</td><td>'+rows[i].description+'</td><td>'+
                        rows[i].reimbursement_amount+'</td><td>'+rows[i].count+'</td></tr>';
                }}
                return html;


}

api.get('/unBilledReimburseHistoy',function(req,res,next){
        //console.log(req.body);

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
                             out.result.pipe(fs.createWriteStream('./Images/'+pdfname));
                             saveInvoice(update_rows,pdfname,function(err,count){
                                if(err){
                                    res.end(err);
                                }else{
                                    res.redirect(req.headers.referer+'#services');
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
    update_query = update_query +'insert into miscellaneous(param,value) values("invoice","'+link+'");';
    //update_query = update_query + 'commit;';
    console.log(update_query);
    return db.query(update_query,callback);
    //function(link,callback){
    //return db.query("insert into miscellaneous(param,value) values('invoice',?)",[link],callback);
    //}
}

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



module.exports = api

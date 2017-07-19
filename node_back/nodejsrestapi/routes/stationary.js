var express = require('express')();
//var router = express.Router();
var stationary=require('../models/stationary');

express.post('/',function(req,res,next){

console.log("inside post method");
            console.log(req.body);
            stationary.addStationaryRequired(req.body,function(err,count){

            if(err)
            {
            	res.json(err);
            }
            else{
                console.log(req.headers.referer);
                //res.redirect()
                    res.redirect(req.headers.referer);//or return count for 1 & 0
                    //res.end('{"success" : "Updated Successfully", "status" : 200}');
                    //res.redirect(req.get('origin'));
                    //res.redirect(req.headers.host);
                }
            });
		});

express.get('/user/:id?',function(req,res,next){
    stationary.getEmployeeById(req.params.id,function(err,rows){

        if(err)
        {
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});
module.exports = express;
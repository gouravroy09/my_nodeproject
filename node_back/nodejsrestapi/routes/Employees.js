var express = require('express');
var router = express.Router();
var Employee=require('../models/Employee');

router.get('/:id?',function(req,res,next){
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
			Employee.getAllEmpTypes(function(err,rows){
				if(err){
					res.json(err);
				}else{
					res.json(rows);
				}
			});
		}
		router.post('/',function(req,res,next){

			Employee.addReimburseType(req.body,function(err,count){

            //console.log(req.body);
            if(err)
            {
            	res.json(err);
            }
            else{
                    res.redirect('http://localhost:5000');//or return count for 1 & 0
                }
            });
		});
	});
module.exports = router
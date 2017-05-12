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
			Employee.getAllReimbursementTypes(function(err,rows){
				if(err){
					res.json(err);
				}else{
					res.json(rows);
				}
			});
		}
	});
//post new reimbursment type
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
//update reimbursement type
router.post('/:id',function(req,res,next){

    Employee.updateReimbursementType(req.params.id,req.body,function(err,rows){

        if(err)
        {
            res.json(err);
        }
        else
        {
            res.redirect('http://localhost:5000/#about');
        }
    });
});
router.delete('/:id',function(req,res,next){

        Employee.deleteReimbursement(req.params.id,function(err,count){

            if(err)
            {
                res.json(err);
            }
            else
            {
                res.redirect('http://localhost:5000/#about');
            }

        });
});
module.exports = router
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
            console.log(req.body.cookie);

			Employee.addReimburseType(req.body,function(err,count){

            console.log(req.body);
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
//update reimbursement type
router.post('/update/:id',function(req,res,next){

    Employee.updateReimbursementType(req.params.id,req.body,function(err,rows){

        if(err)
        {
            res.json(err);
        }
        else
        {
            //res.redirect('http://localhost:5000/#about');
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    });
});
router.post('/delete',function(req,res,next){
    console.log(req.body);

        Employee.deleteReimbursement(req.body.reimbursement_id,function(err,count){

            if(err)
            {
                res.json(err);
            }
            else
            {
                //res.redirect('http://localhost:5000/#about');
                res.redirect(307,req.headers.referer);
                //res.end('{"success" : "Updated Successfully", "status" : 200}');
            }

        });
});
module.exports = router
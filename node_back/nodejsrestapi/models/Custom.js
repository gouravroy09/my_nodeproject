var db=require('../dbconnection');
var Custom2 = {
	getAllEmpTypes:function(callback){

		return db.query("Select * from employee_type",callback);

	},
	getAllReimbursementTypes:function(callback){

		return db.query("select r.id,e.description emp_type,r.description,r.amount,r.frequency,r.emp_grade_code from reimbursement r left join employee_type e on r.emp_type_id =e.id order by id;",callback);

	},
	getEmpTypeById:function(id,callback){
		return db.query("Select * from employee_type where Id=?",[id],callback);
	},
	addReimburseType:function(ReimburseType,callback){
		console.log("inside service");
		console.log(ReimburseType.Emp_Type);
		return db.query("Insert into reimbursement(emp_type_id,description,amount,frequency,emp_grade_code) values(?,?,?,?,?)",
			[ReimburseType.Emp_Type,ReimburseType.Reimbursement_description,
			ReimburseType.amount,ReimburseType.frequency,ReimburseType.Emp_Grade],callback);
	},
	updateReimbursementType:function(id,ReimbursementType,callback){
		console.log("inside service");
		console.log(id);
    return  db.query("update reimbursement set amount=?,frequency=? where id=?",[ReimbursementType.update_amount,
    	ReimbursementType.update_frequency,id],callback);
	},
	deleteReimbursement:function(id,callback){
    return db.query("delete from reimbursement where id=?",[id],callback);
	},
	getReimburesmenTypeByEmpTypeAndGrade:function(id1,id2,callback){

		return db.query("select * from users u left join reimbursement r on u.emp_type_id =r.emp_type_id and u.emp_grade_code =r.emp_grade_code where u.emp_type_id =? and u.emp_grade_code=?",
			[id1,id2],callback);

	},
	getReimbursementHistoryByUserId:function(id,callback){

	return db.query("select * from employee_reimbursement_history where emp_id=?",[id],callback);
	},
	test:function(){
		console.log("inside service");
		return db.query("Insert into reimbursement(emp_type_id,description,amount,frequency,emp_grade_code) values(1,'asdxa',3,3,'E1')");
	},
	getUserById:function(id,callback){

	return db.query("select * from users u left join employee_type e on u.emp_type_id = e.id where emp_no=?",[id],callback);
	},
	addReimbursementHistory:function(History,filepath,callback){
		console.log(JSON.stringify(History));

	return db.query("insert into employee_reimbursement_history(emp_id,reimbursement_type,reimbursement_amount,time,filepath) values(?,?,?,now(),?);",[History.emp_id,History.reimbursement_type,History.reimbursement_amount,filepath],callback);
	},
};

module.exports = Custom2;
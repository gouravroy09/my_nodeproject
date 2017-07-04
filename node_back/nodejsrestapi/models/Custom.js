var db=require('../dbconnection');

var Custom2 = {
	getAllEmpTypes:function(callback){

		return db.query("Select * from employee_type",callback);

	},
	getAllReimbursementTypes:function(callback){

		return db.query("select r.id,e.description emp_type,r.description,r.amount,r.frequency,r.emp_grade_code from reimbursement r inner join employee_type e on r.emp_type_id =e.id order by id;",callback);

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
	addUser:function(string,callback){
		return db.query(string,[],callback);
	},
	updateReimbursementType:function(id,ReimbursementType,callback){
		console.log("inside service");
		console.log(id);
    return  db.query("update reimbursement set amount=?,frequency=? where id=?",[ReimbursementType.update_amount,
    	ReimbursementType.update_frequency,id],callback);
	},
	updateForBillGeneratedReimbursementHistory:function(id,ReimbursementType,callback){
		console.log("inside service");
		console.log(id);
    return  db.query("update reimbursement set amount=?,frequency=? where id=?",[ReimbursementType.update_amount,
    	ReimbursementType.update_frequency,id],callback);
	},
	deleteReimbursement:function(id,callback){
    return db.query("delete from reimbursement where id=?",[id],callback);
	},
	getReimburesmenTypeByEmpTypeAndGrade:function(id1,id2,callback){

		return db.query("select * from reimbursement where emp_type_id =? and emp_grade_code=?",
			[id1,id2],callback);

	},
	getReimbursementHistoryByUserId:function(id,callback){

	return db.query("select er.*,r.description from employee_reimbursement_history er inner join reimbursement r on er.reimbursement_type=r.id where emp_id=? order by time desc",[id],callback);
	},
	/*getPendingReimbursementHistory:function(callback){

	return db.query("select er.*,r.description from employee_reimbursement_history er inner join reimbursement r on er.reimbursement_type=r.id inner join users u on eh.emp_id=u.id where er.status='pending' order by time",callback);
	},*/
	test:function(){
		console.log("inside service");
		return db.query("Insert into reimbursement(emp_type_id,description,amount,frequency,emp_grade_code) values(1,'asdxa',3,3,'E1')");
	},
	getUserById:function(id,callback){

	return db.query("select *,u.id from users u inner join employee_type e on u.emp_type_id = e.id where emp_no=?",[id],callback);
	},
	addReimbursementHistory:function(History,filepath,callback){
		console.log(JSON.stringify(History));

	return db.query("insert into employee_reimbursement_history(emp_id,reimbursement_type,reimbursement_amount,time,filepath,project_code) values(?,?,?,now(),?,?);",[History.emp_id,History.reimbursement_type,History.reimbursement_amount,filepath,History.Project_Code],callback);
	},
	addTravelReimbursementHistory:function(query,callback){

	return db.query(query,callback);
	},
	approvedByHrReimbursementHistoryRow:function(id,callback){
		//console.log(JSON.stringify(History));

	return db.query("update employee_reimbursement_history set status='hr-approved' where id=?;",[id],callback);
	},
	rejectedByHrDocMismatch:function(id,callback){
		//console.log(JSON.stringify(History));

	return db.query("update employee_reimbursement_history set status='hr-reject-doc-nomatch' where id=?;",[id],callback);
	},
	rejectedByHrAmtFreqMismatch:function(id,callback){
		//console.log(JSON.stringify(History));

	return db.query("update employee_reimbursement_history set status='hr-reject-amnt/freq-exceed' where id=?;",[id],callback);
	},
	finApprovedByHrReimbursementHistoryRow:function(id,callback){
		//console.log(JSON.stringify(History));

	return db.query("update employee_reimbursement_history set status='fin-approved' where id=?;",[id],callback);
	},
	getReimbursementHistoyWithUserDetalsByStatus:function(status,callback){
		return db.query("select *,et.description as emp_type_description,r.description as reimbursement_description,rh.id as reimbursement_id from employee_reimbursement_history rh inner join users u on rh.emp_id =u.id inner join reimbursement r on rh.reimbursement_type = r.id inner join employee_type et on et.id=u.emp_type_id where rh.status =?",[status],callback);
	},
	getCurrentMonthReimbursementHistoryForBilling:function(callback){
		return db.query("select * from employee_reimbursement_history eh inner join reimbursement r on r.id = eh.reimbursement_type where eh.bill_generated='no' and month(time)=month(current_date()) and year(time)=year(current_date())",callback);
	},
	getReimbursementHistoryForBilling:function(callback){
		return db.query("select eh.project_code,eh.reimbursement_type,r.description,count(*) as count, sum(eh.reimbursement_amount) as reimbursement_amount,min(time) as time from employee_reimbursement_history eh inner join reimbursement r on r.id = eh.reimbursement_type where eh.bill_generated='no' and eh.status='hr-approved' group by eh.reimbursement_type,eh.project_code order by time",callback);
	},
	getReimbursementHistoryIdsForBilling:function(callback){
		return db.query("select eh.id from employee_reimbursement_history eh inner join reimbursement r on r.id = eh.reimbursement_type where eh.bill_generated='no' and eh.status='hr-approved'",callback);
	},
	getProjectCodes:function(callback){
		return db.query("select * from project_code_employee_mapping",callback);
	},
	getInvoices:function(callback){
		return db.query("select p1.value from  (select @rownum:=@rownum+1 rank, p.value from miscellaneous p, (SELECT @rownum:=0) r order by param desc)  as p1 order by p1.rank desc; ",callback);
	},
	getAllEmpGrades:function(callback){

		return db.query("Select * from employee_grade",callback);

	}
};

module.exports = Custom2;
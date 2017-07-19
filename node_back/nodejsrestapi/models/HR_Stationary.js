var db=require('../dbconnection');
var Employee = {
	addStationaryRequired:function(StationaryRequired,callback){
		console.log("inside service");
		console.log(StationaryRequired.Item);
		return db.query("Insert into stationary_required(Item,Quantity_Required) values(?,?)",
			[StationaryRequired.Item,StationaryRequired.Quantity_Required],callback);
	},
	getEmployeeById:function(id,callback){

	return db.query("select * from users where emp_no=?",[id],callback);
	},
};
module.exports = Employee;
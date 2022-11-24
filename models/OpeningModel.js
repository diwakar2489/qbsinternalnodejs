var dbConn = require("../config/mysql_connection.js");
var Openings = function (list){
    this.id = list.id;
    this.dept_id = list.dept_id;
    this.role_id = list.role_id;
    this.opening_limit = list.opening_limit;
    this.name = list.name;
    this.description = list.description;
    this.status = list.status;
};
//get All Openings
Openings.getAllOpenings = (result) =>{
    dbConn.query('select O.* from tm_opening as O ',(err,res)=>{
        if(err){
            console.log(err)
            result(err);
        }else {
            result(null,res);
        }
    })
}
//get All Openings
Openings.getOpeningsById = (ID,result) =>{
    dbConn.query('select O.* from tm_opening as O where O.id ="'+ID+'"',(err,res)=>{
        if(err){
            console.log(err)
            result(err);
        }else {
            result(null,res);
        }
    })
}
//get add Project
Openings.createProjectInfo = (ProjectReqData, result) =>{
    //console.log(ProjectReqData);return false;
    var command = 'INSERT INTO tm_opening (comp_id,dept_id,role_id,opening_limit,name,description,experience,created_on,created_by,status) VALUES (?,?,?,?,?,?,?,?,?,?)' ;
    //var id = uuidv1();
    dbConn.query(command,[
        ProjectReqData.comp_id,
        ProjectReqData.dept_id,
        ProjectReqData.role_id,
        ProjectReqData.opening_limit,
        ProjectReqData.name,
        ProjectReqData.description,
        ProjectReqData.experience,
        ProjectReqData.created_on,
        ProjectReqData.created_by,
        ProjectReqData.status
    ],
        (err,res)=>{
        if(err){
            console.log(err)
        }else {
            var opening_id = res.insertId;
            console.log('Last insert ID in opening', opening_id);
            result(null,opening_id);
        }
    })
};
module.exports = Openings;
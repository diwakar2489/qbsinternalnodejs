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
//get add Project
Openings.createProjectInfo = (ProjectReqData, result) =>{
    
    var command = 'INSERT INTO tm_opening (dept_id,role_id,opening_limit,name,description,created_by,status) VALUES (?,?,?,?,?,?,?)' ;
    //var id = uuidv1();
    dbConn.query(command,[
        ProjectReqData.dept_id,
        ProjectReqData.role_id,
        ProjectReqData.opening_limit,
        ProjectReqData.name,
        ProjectReqData.description,
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
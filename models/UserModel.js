
var dbConn = require("../config/mysql_connection.js");
var Users = function (list){
    this.id = list.id;
    this.email = list.email;
    this.dept = list.dept_id;
    this.status = list.status;
};
//get All Users
Users.getAllUsers = (result) =>{
    dbConn.query('select U.id,concat(UD.fname," ",UD.mname," ",UD.lname) as name,U.email,U.alt_email,U.dept_id,U.role_id,U.status from tm_user as U '+
    'join tm_user_detail as UD on UD.user_id = U.id ',(err,res)=>{
        if(err){
            console.log(err)
            result(err);
        }else {
            result(null,res);
        }
    })
}
//get Users by id
Users.getUsersById = (emailID,results)  =>{
    dbConn.query('select U.id,concat(UD.fname," ",UD.mname," ",UD.lname) as name,U.email,U.password,U.alt_email,U.dept_id,U.role_id,U.status from tm_user as U '+
    'join tm_user_detail as UD on UD.user_id = U.id where U.email = "'+emailID+'"',(err,res)=>{
        if(err){
            results(err);
        }else {
           results(null,res);
        }
    })
}
//get Users by RefreshToken
Users.getUsersByRefreshToken = (RefreshToken,results)  =>{
    dbConn.query('select U.id,concat(UD.fname," ",UD.mname," ",UD.lname) as name,U.email,U.password,U.alt_email,U.refresh_token,U.dept_id,U.role_id,U.status from tm_user as U '+
    'join tm_user_detail as UD on UD.user_id = U.id where U.refresh_token = "'+RefreshToken+'"',(err,res)=>{
        if(err){
            results(err);
        }else {
           results(null,res);
        }
    })
}
//update Users
Users.updateUsersInfo = (id, userReqtData, result) =>{
    if(id){
        var command = 'update  tm_user set refresh_token = ? where id= ?'
        dbConn.query(command,
            [
                userReqtData.refresh_token,
                id
            ],(err,res)=>{
                console.log(dbConn.query);
            if(err){
                console.log(err)
            }else {
                result(null,res);
            }
        })
    }else{
        console.log(err)
    }
    
}
module.exports = Users;
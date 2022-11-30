var dbConn = require("../config/mysql_connection.js");
var Dashboard = function (list){
    this.id = list.id;
    this.message = list.message;
    this.status = list.status;
};
//get All Dashboard
Dashboard.getAllDashboard = (result) =>{
    dbConn.query('select M.* from tm_message as M ',(err,res)=>{
        if(err){
            console.log(err)
            result(err);
        }else {
            result(null,res);
        }
    })
}
//get add Dashboard
Dashboard.createMessage = (DashboardReqData, result) =>{
    //console.log(DashboardReqData);return false;
    var command = 'INSERT INTO tm_message (comp_id,user_id,from_email,message,other_message,photo,status,created_on,created_by) VALUES (?,?,?,?,?,?,?,?,?)' ;
    //var id = uuidv1();
    dbConn.query(command,[
        DashboardReqData.comp_id,
        DashboardReqData.UserId,
        DashboardReqData.fromEmail,
        DashboardReqData.UserMessage,
        DashboardReqData.OtherMessage,
        DashboardReqData.photo,
        DashboardReqData.status,
        DashboardReqData.created_on,
        DashboardReqData.created_by
        
    ],
        (err,res)=>{
        if(err){
            console.log(err)
        }else {
            var msg_id = res.insertId;
            console.log('Last insert ID in Message dashboard', msg_id);
            result(null,msg_id);
        }
    })
};
module.exports = Dashboard;
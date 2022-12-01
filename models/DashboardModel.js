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
    var command = 'INSERT INTO tm_message (comp_id,title,message,photo,status,created_on,created_by) VALUES (?,?,?,?,?,?,?)' ;
    //var id = uuidv1();
    dbConn.query(command,[
        DashboardReqData.comp_id,
        DashboardReqData.title,
        DashboardReqData.message,
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
//get Message By id
Dashboard.getMessageById = (ID,result) =>{
    dbConn.query('select M.* from tm_message as M where M.id ="'+ID+'"',(err,res)=>{
        if(err){
            console.log(err)
            result(err);
        }else {
            result(null,res);
        }
    })
};

//get updated Dashboard
Dashboard.updateDashboardWithIMGInfo = (ID,DashboardReqData, result) =>{
    //console.log(DashboardReqData);return false;
    if(ID){
    var command = 'update tm_message set comp_id = ?,title =?,message = ?, photo = ?,status = ?,updated_on = ?,updated_by = ? where id= ?'
    //var id = uuidv1();
    dbConn.query(command,[
        DashboardReqData.comp_id,
        DashboardReqData.title,
        DashboardReqData.message,
        DashboardReqData.photo,
        DashboardReqData.status,
        DashboardReqData.updated_on,
        DashboardReqData.updated_by,
        ID
        
    ],(err,res)=>{
        if(err){
            console.log(err)
        }else {
            result(null,res);
        }
    })
}else{
    console.log(err)
}
};
//get updated Dashboard
Dashboard.updateDashboardWithoutIMGInfo = (ID,DashboardReqData, result) =>{
    //console.log(DashboardReqData);return false;
    if(ID){
    var command = 'update tm_message set comp_id = ?,title =?,message = ?,status = ?,updated_on = ?,updated_by = ? where id= ?'
    //var id = uuidv1();
    dbConn.query(command,[
        DashboardReqData.comp_id,
        DashboardReqData.title,
        DashboardReqData.message,
        DashboardReqData.status,
        DashboardReqData.updated_on,
        DashboardReqData.updated_by,
        ID
        
    ],(err,res)=>{
        if(err){
            console.log(err)
        }else {
            result(null,res);
        }
    })
}else{
    console.log(err)
}
};

module.exports = Dashboard;
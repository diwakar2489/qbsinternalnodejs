var dbConn = require("../config/mysql_connection.js");
var Dashboard = function (list) {
    this.id = list.id;
    this.message = list.message;
    this.status = list.status;
};
/*======================== get Dashboard User Message  ===========================*/
Dashboard.getDashboardUserMessage = (result) => {
    dbConn.query('select M.id,M.title,M.created_on,M.photo as img from tm_message as M where M.status = 1 order by M.id desc ', (err, res) => {
        if (err) {
            console.log(err)
            result(err);
        } else {
            result(null, res);
        }
    })
}
/*=============== Get All Dashboard Messages ============================*/
Dashboard.getAllDashboard = (pagees, pageSize, total, result) => {
    const numOfResults = total;
    const numberOfPages = Math.ceil(numOfResults / pageSize);
    let page = pagees ? Number(pagees) : 1;
    const startingLimit = (page - 1) * pageSize;

    dbConn.query('select M.id,M.photo as img,M.status,M.title,M.message,C.name as company from tm_message as M ' +
        'left join tm_company as C on C.id = M.comp_id ORDER BY M.id desc limit ' + startingLimit + ',' + pageSize, (err, res) => {
        if (err) {
            console.log(err)
            result(err);
        } else {
            result(null, res);
        }
    })
}
/*======================== get All count Dashboard ===========================*/
Dashboard.countDashboardMessages = (result) => {
    dbConn.query('select COUNT(M.id) as Total from tm_message as M ', (err, res) => {
        if (err) {
            console.log(err)
            result(err);
        } else {
            result(null, res);
        }
    })
}
/*============================ Add Dashboard Messages ======================================*/
Dashboard.createMessage = (DashboardReqData, result) => {

    var command = 'INSERT INTO tm_message (comp_id,title,message,photo,status,created_on,created_by) VALUES (?,?,?,?,?,?,?)';
    //var id = uuidv1();
    dbConn.query(command, [
        DashboardReqData.comp_id,
        DashboardReqData.title,
        DashboardReqData.message,
        DashboardReqData.photo,
        DashboardReqData.status,
        DashboardReqData.created_on,
        DashboardReqData.created_by

    ],
        (err, res) => {
            if (err) {
                console.log(err)
            } else {
                var msg_id = res.insertId;
                console.log('Last insert ID in Message dashboard', msg_id);
                result(null, msg_id);
            }
        })
};
/*============================== Edit Dashboard message By id =============================*/
Dashboard.getMessageById = (ID, result) => {
    dbConn.query('select M.* from tm_message as M where M.id ="' + ID + '"', (err, res) => {
        if (err) {
            console.log(err)
            result(err);
        } else {
            result(null, res);
        }
    })
};

/*===================  updated Dashboard message with attachment ======================*/
Dashboard.updateDashboardWithIMGInfo = (ID, DashboardReqData, result) => {
    if (ID) {
        var command = 'update tm_message set comp_id = ?,title =?,message = ?, photo = ?,status = ?,updated_on = ?,updated_by = ? where id= ?'
        //var id = uuidv1();
        dbConn.query(command, [
            DashboardReqData.comp_id,
            DashboardReqData.title,
            DashboardReqData.message,
            DashboardReqData.photo,
            DashboardReqData.status,
            DashboardReqData.updated_on,
            DashboardReqData.updated_by,
            ID

        ], (err, res) => {
            if (err) {
                console.log(err)
            } else {
                result(null, res);
            }
        })
    } else {
        console.log(err)
    }
};
/*===================  updated Dashboard message Without attachment ======================*/
Dashboard.updateDashboardWithoutIMGInfo = (ID, DashboardReqData, result) => {
    if (ID) {
        var command = 'update tm_message set comp_id = ?,title =?,message = ?,status = ?,updated_on = ?,updated_by = ? where id= ?'
        //var id = uuidv1();
        dbConn.query(command, [
            DashboardReqData.comp_id,
            DashboardReqData.title,
            DashboardReqData.message,
            DashboardReqData.status,
            DashboardReqData.updated_on,
            DashboardReqData.updated_by,
            ID

        ], (err, res) => {
            if (err) {
                console.log(err)
            } else {
                result(null, res);
            }
        })
    } else {
        console.log(err)
    }
};

module.exports = Dashboard;
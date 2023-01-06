var dbConn = require("../config/mysql_connection.js");
var Policy = function (list) {
    this.id = list.id;
    this.title = list.title;
    this.message = list.message;
    this.status = list.status;
};
/*=============== Get Search All Policy ============================*/
Policy.getAllSearchPolicy = (search, pagees, pageSize,result) => {
    let page = pagees ? Number(pagees) : 1;
    const startingLimit = (page - 1) * pageSize;
    dbConn.query('select P.id,P.status,P.title,P.message,Cm.name as company from tm_policy as P ' +
    'left join tm_company as Cm on Cm.id = P.comp_id where P.title LIKE "%' + search + '%" ORDER BY P.id desc limit ' + startingLimit + ',' + pageSize, (err, res) => {
        if (err) {
            console.log(err)
            result(err);
        } else {
            result(null, res);
        }
    })
}
/*=============== Get All Policy ============================*/
Policy.getAllPolicy = (pagees, pageSize,result) => {
    let page = pagees ? Number(pagees) : 1;
    const startingLimit = (page - 1) * pageSize;
    dbConn.query('select P.id,P.policy_attachment as img,P.status,P.title,P.message,Cm.name as company,P.created_on from tm_policy as P ' +
    'left join tm_company as Cm on Cm.id = P.comp_id ORDER BY P.id desc limit ' + startingLimit + ',' + pageSize, (err, res) => {
        if (err) {
            console.log(err)
            result(err);
        } else {
            result(null, res);
        }
    })
}
/*=============== Get dashboard Policy ============================*/
Policy.dashboardPolicyList = (UserID,result) => {
    dbConn.query('select P.id,P.policy_attachment as img,P.title,P.created_on from tm_policy as P ' +
    // 'left join tm_company as Cm on Cm.id = P.comp_id '+
    'left join tm_user as U on  U.comp_id = P.comp_id where U.id = "'+UserID+'" ORDER BY P.id desc ', (err, res) => {
        if (err) {
            console.log(err)
            result(err);
        } else {
            result(null, res);
        }
    })
}
/*======================== get All count Policy ===========================*/
Policy.countPolicyMessages = (result) => {
    dbConn.query('select COUNT(P.id) as Total from tm_policy as P ', (err, res) => {
        if (err) {
            console.log(err)
            result(err);
        } else {
            result(null, res);
        }
    })
}
/*============================ Add Policy ======================================*/
Policy.createPolicy = (PolicyReqData, result) => {
    var command = 'INSERT INTO tm_policy (comp_id,title,message,policy_attachment,status,created_on,created_by) VALUES (?,?,?,?,?,?,?)';
    //var id = uuidv1();
    dbConn.query(command, [
        PolicyReqData.comp_id,
        PolicyReqData.title,
        PolicyReqData.message,
        PolicyReqData.attachment,
        PolicyReqData.status,
        PolicyReqData.created_on,
        PolicyReqData.created_by

    ],
        (err, res) => {
            if (err) {
                console.log(err)
            } else {
                var msg_id = res.insertId;
                console.log('Last insert ID in Policy', msg_id);
                result(null, msg_id);
            }
        })
};
/*================================= Edit Policy By id ==================================*/
Policy.getPolicyMessageById = (ID, result) => {
    dbConn.query('select P.* from tm_policy as P where P.id ="' + ID + '"', (err, res) => {
        if (err) {
            console.log(err)
            result(err);
        } else {
            result(null, res);
        }
    })
};

/*======================================  updated Policy with attachment ==================================================*/
Policy.updatePolicyWithIMGInfo = (ID, PolicyReqData, result) => {
    if (ID) {
        var command = 'update tm_policy set comp_id = ?,title =?,message = ?, policy_attachment = ?,status = ?,updated_on = ?,updated_by = ? where id= ?'
        //var id = uuidv1();
        dbConn.query(command, [
            PolicyReqData.comp_id,
            PolicyReqData.title,
            PolicyReqData.message,
            PolicyReqData.photo,
            PolicyReqData.status,
            PolicyReqData.updated_on,
            PolicyReqData.updated_by,
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
/*================================== updated Policy without attachment ============================================*/
Policy.updatePolicyWithoutIMGInfo = (ID, PolicyReqData, result) => {
    if (ID) {
        var command = 'update tm_policy set comp_id = ?,title =?,message = ?,status = ?,updated_on = ?,updated_by = ? where id= ?'
        //var id = uuidv1();
        dbConn.query(command, [
            PolicyReqData.comp_id,
            PolicyReqData.title,
            PolicyReqData.message,
            PolicyReqData.status,
            PolicyReqData.updated_on,
            PolicyReqData.updated_by,
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

module.exports = Policy;
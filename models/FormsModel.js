var dbConn = require("../config/mysql_connection.js");
var Forms = function (list) {
    this.id = list.id;
    this.title = list.title;
    this.message = list.message;
    this.status = list.status;
};
/*======================== get Users Forms Dashboard ===========================*/
Forms.getDashboardFormsData = (UserID,pagees, pageSize,result) => {
    let page = pagees ? Number(pagees) : 1;
    const startingLimit = (page - 1) * pageSize;
    dbConn.query('select F.id,F.title,F.created_on,F.form_attachment as img from tm_forms as F '+
    'left join tm_user as U on U.comp_id = F.comp_id where U.id = "'+UserID+'" and F.status = 1 order by F.id desc limit ' + startingLimit + ',' + pageSize, (err, res) => {
        if (err) {
            console.log(err)
            result(err);
        } else {
            result(null, res);
        }
    })
}
/*======================== get Dashboard count Forms ===========================*/
Forms.countFormsDashboardMessages = (UserID,result) => {
    dbConn.query('select COUNT(F.id) as Total from tm_forms as F '+
    'left join tm_user as U on U.comp_id = F.comp_id where U.id = "'+UserID+'" and F.status = 1 ', (err, res) => {
        if (err) {
            console.log(err)
            result(err);
        } else {
            result(null, res);
        }
    })
}
/*=============== Search All Forms ============================*/
Forms.getAllSearchFomrs = (search,pagees, pageSize,result) => {
    let page = pagees ? Number(pagees) : 1;
    const startingLimit = (page - 1) * pageSize;
    dbConn.query('select F.id,F.form_attachment as img,F.status,F.title,F.message,F.created_on as uploding_date,Cm.name as company from tm_forms as F ' +
    'left join tm_company as Cm on Cm.id = F.comp_id Where F.title like "%' + search + '%" ORDER BY F.id desc limit ' + startingLimit + ',' + pageSize, (err, res) => {
        if (err) {
            console.log(err)
            result(err);
        } else {
            result(null, res);
        }
    })
}
/*=============== Get All Forms ============================*/
Forms.getAllForms = (pagees, pageSize,result) => {
    let page = pagees ? Number(pagees) : 1;
    const startingLimit = (page - 1) * pageSize;
    dbConn.query('select F.id,F.form_attachment as img,F.status,F.title,F.message, Cm.name as company from tm_forms as F ' +
    'left join tm_company as Cm on Cm.id = F.comp_id ORDER BY F.id desc limit ' + startingLimit + ',' + pageSize, (err, res) => {
        if (err) {
            console.log(err)
            result(err);
        } else {
            result(null, res);
        }
    })
}
/*======================== get All count Forms ===========================*/
Forms.countFormsMessages = (result) => {
    dbConn.query('select COUNT(F.id) as Total from tm_forms as F ', (err, res) => {
        if (err) {
            console.log(err)
            result(err);
        } else {
            result(null, res);
        }
    })
}
/*============================ Add Forms ======================================*/
Forms.createForms = (FormsReqData, result) => {
    var command = 'INSERT INTO tm_forms (comp_id,title,message,form_attachment,status,created_on,created_by) VALUES (?,?,?,?,?,?,?)';
    //var id = uuidv1();
    dbConn.query(command, [
        FormsReqData.comp_id,
        FormsReqData.title,
        FormsReqData.message,
        FormsReqData.attachment,
        FormsReqData.status,
        FormsReqData.created_on,
        FormsReqData.created_by

    ],
        (err, res) => {
            if (err) {
                console.log(err)
            } else {
                var msg_id = res.insertId;
                console.log('Last insert ID in forms', msg_id);
                result(null, msg_id);
            }
        })
};
/*================================= Edit Forms By id ==================================*/
Forms.getFormsMessageById = (ID, result) => {
    dbConn.query('select F.* from tm_forms as F where F.id ="' + ID + '"', (err, res) => {
        if (err) {
            console.log(err)
            result(err);
        } else {
            result(null, res);
        }
    })
};

/*======================================  updated Forms with attachment ==================================================*/
Forms.updateFormsWithIMGInfo = (ID, FormsReqData, result) => {
    if (ID) {
        var command = 'update tm_forms set comp_id = ?,title =?,message = ?, form_attachment = ?,status = ?,updated_on = ?,updated_by = ? where id= ?'
        //var id = uuidv1();
        dbConn.query(command, [
            FormsReqData.comp_id,
            FormsReqData.title,
            FormsReqData.message,
            FormsReqData.photo,
            FormsReqData.status,
            FormsReqData.updated_on,
            FormsReqData.updated_by,
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
/*================================== updated Forms without attachment ============================================*/
Forms.updateFormsWithoutIMGInfo = (ID, FormsReqData, result) => {
    if (ID) {
        var command = 'update tm_forms set comp_id = ?,title =?,message = ?,status = ?,updated_on = ?,updated_by = ? where id= ?'
        //var id = uuidv1();
        dbConn.query(command, [
            FormsReqData.comp_id,
            FormsReqData.title,
            FormsReqData.message,
            FormsReqData.status,
            FormsReqData.updated_on,
            FormsReqData.updated_by,
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

module.exports = Forms;
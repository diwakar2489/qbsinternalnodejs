var dbConn = require("../config/mysql_connection.js");
var Circular = function (list) {
    this.id = list.id;
    this.title = list.title;
    this.message = list.message;
    this.status = list.status;
};
/*======================== get Dashboard Circular List ===========================*/
Circular.dashboardCircularList = (UserID,result) => {
   
    dbConn.query('select C.id,C.circular_attachment as img,C.status,C.title,C.created_on from tm_circulars as C '+
    'join tm_user as U on U.comp_id = C.comp_id where U.id = '+UserID+' ORDER BY C.id desc ', (err, res) => {
        if (err) {
            console.log(err)
            result(err);
        } else {
            result(null, res);
        }
    })
}
/*=============== Get All Circular ============================*/
Circular.getAllCircular = (pagees, pageSize,result) => {
    let page = pagees ? Number(pagees) : 1;
    const startingLimit = (page - 1) * pageSize;
    dbConn.query('select C.id,C.circular_attachment as img,C.status,C.title,C.message,C.created_on,Cm.name as company from tm_circulars as C ' +
    'left join tm_company as Cm on Cm.id = C.comp_id ORDER BY C.id desc limit ' + startingLimit + ',' + pageSize, (err, res) => {
        if (err) {
            console.log(err)
            result(err);
        } else {
            result(null, res);
        }
    })
}
/*======================== get All count Circular ===========================*/
Circular.countCircularsMessagesList = (result) => {
    dbConn.query('select COUNT(C.id) as Total from tm_circulars as C ', (err, res) => {
        if (err) {
            console.log(err)
            result(err);
        } else {
            result(null, res);
        }
    })
}
/*============================ Add Circular ======================================*/
Circular.createCircular = (CircularReqData, result) => {
    var command = 'INSERT INTO tm_circulars (comp_id,title,message,circular_attachment,status,created_on,created_by) VALUES (?,?,?,?,?,?,?)';
    //var id = uuidv1();
    dbConn.query(command, [
        CircularReqData.comp_id,
        CircularReqData.title,
        CircularReqData.message,
        CircularReqData.attachment,
        CircularReqData.status,
        CircularReqData.created_on,
        CircularReqData.created_by

    ],
        (err, res) => {
            if (err) {
                console.log(err)
            } else {
                var msg_id = res.insertId;
                console.log('Last insert ID in Circular', msg_id);
                result(null, msg_id);
            }
        })
};
/*================================= Edit Circular By id ==================================*/
Circular.getCircularMessageById = (ID, result) => {
    dbConn.query('select C.* from tm_circulars as C where C.id ="' + ID + '"', (err, res) => {
        if (err) {
            console.log(err)
            result(err);
        } else {
            result(null, res);
        }
    })
};

/*======================================  updated Circular with attachment ==================================================*/
Circular.updateCircularWithIMGInfo = (ID, CircularReqData, result) => {
    if (ID) {
        var command = 'update tm_circulars set comp_id = ?,title =?,message = ?, circular_attachment = ?,status = ?,updated_on = ?,updated_by = ? where id= ?'
        //var id = uuidv1();
        dbConn.query(command, [
            CircularReqData.comp_id,
            CircularReqData.title,
            CircularReqData.message,
            CircularReqData.attachment,
            CircularReqData.status,
            CircularReqData.updated_on,
            CircularReqData.updated_by,
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
/*================================== updated Circular without attachment ============================================*/
Circular.updateCircularWithoutIMGInfo = (ID, CircularReqData, result) => {
    if (ID) {
        var command = 'update tm_circulars set comp_id = ?,title =?,message = ?,status = ?,updated_on = ?,updated_by = ? where id= ?'
        //var id = uuidv1();
        dbConn.query(command, [
            CircularReqData.comp_id,
            CircularReqData.title,
            CircularReqData.message,
            CircularReqData.status,
            CircularReqData.updated_on,
            CircularReqData.updated_by,
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

module.exports = Circular;
var dbConn = require("../config/mysql_connection.js");
var Bulletin = function (list) {
    this.id = list.id;
    this.title = list.title;
    this.message = list.message;
    this.status = list.status;
};
/*=============== Get Search All Bulletin ============================*/
Bulletin.getAllSearchBulletin = (search, pagees, pageSize,result) => {
    let page = pagees ? Number(pagees) : 1;
    const startingLimit = (page - 1) * pageSize;
    dbConn.query('select B.id,B.title,B.message,B.status,Cm.name as company,B.created_on as opening_date from tm_bulletin as B ' +
    'left join tm_company as Cm on Cm.id = B.comp_id '+
    ' where B.title LIKE "%' + search + '%" ORDER BY B.id desc limit ' + startingLimit + ',' + pageSize, (err, res) => {
        if (err) {
            console.log(err)
            result(err);
        } else {
            result(null, res);
        }
    })
}
/*=============== Get All Bulletin ============================*/
Bulletin.getAllBulletin = (pagees, pageSize,result) => {

    let page = pagees ? Number(pagees) : 1;
    const startingLimit = (page - 1) * pageSize;

    dbConn.query('select B.id,B.bulletin_attachment as img,B.status,B.title,B.message,C.name as company from tm_bulletin as B ' +
    'left join tm_company as C on C.id = B.comp_id ORDER BY B.id desc limit ' + startingLimit + ',' + pageSize, (err, res) => {
        if (err) {
            console.log(err)
            result(err);
        } else {
            result(null, res);
        }
    })
}
/*======================== get All count Bulletin ===========================*/
Bulletin.countBulletinsMessages = (result) => {
    dbConn.query('select COUNT(B.id) as Total from tm_bulletin as B ', (err, res) => {
        if (err) {
            console.log(err)
            result(err);
        } else {
            result(null, res);
        }
    })
}
/*============================ Add Bulletin ======================================*/
Bulletin.createBulletin = (BulletinReqData, result) => {
    var command = 'INSERT INTO tm_bulletin (comp_id,title,message,bulletin_attachment,status,created_on,created_by) VALUES (?,?,?,?,?,?,?)';
    //var id = uuidv1();
    dbConn.query(command, [
        BulletinReqData.comp_id,
        BulletinReqData.title,
        BulletinReqData.message,
        BulletinReqData.attachment,
        BulletinReqData.status,
        BulletinReqData.created_on,
        BulletinReqData.created_by

    ],
        (err, res) => {
            if (err) {
                console.log(err)
            } else {
                var msg_id = res.insertId;
                console.log('Last insert ID in bulletin', msg_id);
                result(null, msg_id);
            }
        })
};
/*================================= Edit Bulletin By id ==================================*/
Bulletin.getBulletinMessageById = (ID, result) => {
    dbConn.query('select M.* from tm_bulletin as M where M.id ="' + ID + '"', (err, res) => {
        if (err) {
            console.log(err)
            result(err);
        } else {
            result(null, res);
        }
    })
};

/*======================================  updated Bulletin with attachment ==================================================*/
Bulletin.updateBulletinWithIMGInfo = (ID, BulletinReqData, result) => {
    if (ID) {
        var command = 'update tm_bulletin set comp_id = ?,title =?,message = ?, bulletin_attachment = ?,status = ?,updated_on = ?,updated_by = ? where id= ?'
        //var id = uuidv1();
        dbConn.query(command, [
            BulletinReqData.comp_id,
            BulletinReqData.title,
            BulletinReqData.message,
            BulletinReqData.photo,
            BulletinReqData.status,
            BulletinReqData.updated_on,
            BulletinReqData.updated_by,
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
/*================================== updated Bulletin without attachment ============================================*/
Bulletin.updateBulletinWithoutIMGInfo = (ID, BulletinReqData, result) => {
    if (ID) {
        var command = 'update tm_bulletin set comp_id = ?,title =?,message = ?,status = ?,updated_on = ?,updated_by = ? where id= ?'
        //var id = uuidv1();
        dbConn.query(command, [
            BulletinReqData.comp_id,
            BulletinReqData.title,
            BulletinReqData.message,
            BulletinReqData.status,
            BulletinReqData.updated_on,
            BulletinReqData.updated_by,
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

module.exports = Bulletin;
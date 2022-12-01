var dbConn = require("../config/mysql_connection.js");
var Bulletin = function (list){
    this.id = list.id;
    this.title = list.title;
    this.message = list.message;
    this.status = list.status;
};
//get All Bulletin
Bulletin.getAllBulletin = (result) =>{
    dbConn.query('select B.* from tm_bulletin as B ',(err,res)=>{
        if(err){
            console.log(err)
            result(err);
        }else {
            result(null,res);
        }
    })
}
//get add Bulletin
Bulletin.createBulletin = (BulletinReqData, result) =>{
    //console.log(BulletinReqData);return false;
    var command = 'INSERT INTO tm_bulletin (comp_id,title,message,bulletin_attachment,status,created_on,created_by) VALUES (?,?,?,?,?,?,?)' ;
    //var id = uuidv1();
    dbConn.query(command,[
        BulletinReqData.comp_id,
        BulletinReqData.title,
        BulletinReqData.message,
        BulletinReqData.attachment,
        BulletinReqData.status,
        BulletinReqData.created_on,
        BulletinReqData.created_by
        
    ],
        (err,res)=>{
        if(err){
            console.log(err)
        }else {
            var msg_id = res.insertId;
            console.log('Last insert ID in bulletin', msg_id);
            result(null,msg_id);
        }
    })
};
//get Bulletin By id
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

//get updated Bulletin
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
//get updated Bulletin
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
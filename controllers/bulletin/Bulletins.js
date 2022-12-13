var Bulletins = require('../../models/BulletinModel');
var path = require('path');

/*=============== Get All Bulletin ============================*/
module.exports.searchBulletinData = (req, res) => {
    try {
        const pageSize = 5;
        const search = req.query.query || '' ;
        const page = parseInt(req.query.page);
        Bulletins.countBulletinsMessages((error1, total) => {
            Bulletins.getAllSearchBulletin(search,page, pageSize, (error, data) => {
                res.status(200).json({
                    status: true,
                    msg: 'Bulletin message successfully',
                    nbPages: total[0].Total,
                    page: page,
                    limit: pageSize,
                    bulletin: data
                });
            });
        });

    } catch (error) {
        res.status(201).json({ status: false, msg: error })
    }
}
/*=============== Get All Bulletin ============================*/
module.exports.getAllBulletins = (req, res) => {
    try {
        const pageSize = 2;
        const page = parseInt(req.query.page) || 1;
        Bulletins.countBulletinsMessages((error1, total) => {
            Bulletins.getAllBulletin(page, pageSize, (error, data) => {
                res.status(200).json({
                    status: true,
                    msg: 'Bulletin message successfully',
                    TotalRecords: total,
                    page_no: page,
                    limit: pageSize,
                    result: data
                });
            });
        });

    } catch (error) {
        res.status(201).json({ status: false, msg: error })
    }
}
/*============================ Add Bulletin ======================================*/
module.exports.addBulletin = async (req, res) => {
    //console.log(req.files);
    try {
        const { compId, title, message,attachment, status, date_formate, userId } = req.body;
        if (attachment) {
            // let fileName = Date.now() + '_' + req.files.attachment.name;

            // let newPath = path.join(process.cwd(), 'uploads/bulletins', fileName);
            // req.files.attachment.mv(newPath);
            var requestData = {
                comp_id: compId,
                title: title,
                message: message,
                attachment: attachment,
                status: status,
                created_on: date_formate,
                created_by: userId,
            }
            Bulletins.createBulletin(requestData, (error, message) => {
                console.log(message);
                if (message) {
                    res.status(200).json({ status: true, msg: "Bulletin data inserted successfully", data: message });
                } else {
                    res.status(201).json({ status: false, msg: "Something Went Wrong" });
                }

            });

        } else {
            return res.status(201).json({ status: false, msg: "Image field is required" });
        }


    } catch (error) {
        res.status(400).json({ status: false, msg: "Something Went Wrong" });
        console.log(error);
    }
};
/*================================= Edit Bulletin By id ==================================*/
module.exports.editBulletinMessage = async (req, res) => {
    try {
        let ID = req.body.id;
        console.log(ID)
        Bulletins.getBulletinMessageById(ID, (error, data) => {
            console.log(data);
            if (data != '') {
                res.status(200).json({ status: true, msg: "Bulletin Message Data fatch successfully", result: data[0] });
            } else {
                res.status(201).json({ status: false, msg: "Bulletin Message ID not founds !" });

            }
        });
    } catch (e) {
        res.status(204).json({ status: false, msg: "Bulletin message ID not founds !" });
    }
};
/*======================================  updated Bulletin with & Without attachment ==================================================*/
module.exports.BulletinMessageUpdate = async (req, res) => {
  //  console.log(req.files);
    try {
        let ID = req.body.id;
        let fileName = {};
        const { compId, title, message,attachment, status, updated_on, updated_by } = req.body;
        if (attachment) {
            // fileName = Date.now() + '_' + req.files.attachment.name;
            // let newPath = path.join(process.cwd(), 'uploads/bulletins', fileName);
            // req.files.attachment.mv(newPath);
            var requestData = {
                comp_id: compId,
                title: title,
                message: message,
                attachment: attachment,
                status: status,
                updated_on: updated_on,
                updated_by: updated_by,
            }
            Bulletins.updateBulletinWithIMGInfo(ID, requestData, (error, data) => {
                console.log(data);
                if (data.affectedRows > 0) {

                    res.status(200).json({ status: true, msg: 'Update Bulletin message successfully', result: data });
                } else {
                    res.status(201).json({ status: false, msg: 'Error for Update Bulletin message Id=' + ID });
                }
            });

        } else {
            var requestData = {
                comp_id: compId,
                title: title,
                message: message,
                status: status,
                updated_on: updated_on,
                updated_by: updated_by,
            }
            Bulletins.updateBulletinWithoutIMGInfo(ID, requestData, (error, data) => {
                console.log(data);
                if (data.affectedRows > 0) {

                    res.status(200).json({ status: true, msg: 'Update Bulletin message successfully', result: data });
                } else {
                    res.status(201).json({ status: false, msg: 'Error for Update Bulletin message Id=' + ID });
                }
            });
        }
    } catch (e) {
        res.status(204).json({ status: false, msg: 'Something went wrong!.' });

    }
};

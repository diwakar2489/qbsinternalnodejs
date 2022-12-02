var Bulletins = require('../../models/BulletinModel');
var path = require('path');

/*=============== Get All Bulletin ============================*/
module.exports.getAllBulletins = (req, res) => {
    try {
        Bulletins.getAllBulletin((error, data) => {
            res.status(200).json({ status: true, msg: 'Bulletin message successfully', result: data });
        });

    } catch (error) {
        res.status(201).json({ status: false, msg: error })
    }
}
/*============================ Add Bulletin ======================================*/
module.exports.addBulletin = async (req, res) => {
    console.log(req.files);
    try {
        const { compId, title, message, status, date_formate, userId } = req.body;
        if (req.files) {
            let fileName = Date.now() + '_' + req.files.attachment.name;

            let newPath = path.join(process.cwd(), 'uploads/bulletins', fileName);
            req.files.attachment.mv(newPath);
            var requestData = {
                comp_id: compId,
                title: title,
                message: message,
                attachment: fileName,
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
                res.status(200).json({ status: true, msg: "Bulletin Message Data fatch successfully", result: data });
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
    console.log(req.files);
    try {
        let ID = req.body.id;
        let fileName = {};
        const { compId, title, message, status, date_formate, userId } = req.body;
        if (req.files) {
            fileName = Date.now() + '_' + req.files.attachment.name;
            let newPath = path.join(process.cwd(), 'uploads/bulletins', fileName);
            req.files.attachment.mv(newPath);
            var requestData = {
                comp_id: compId,
                title: title,
                message: message,
                attachment: fileName,
                status: status,
                updated_on: date_formate,
                updated_by: userId,
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
                updated_on: date_formate,
                updated_by: userId,
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
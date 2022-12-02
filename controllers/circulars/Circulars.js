var Circulars = require('../../models/CircularModel');
var path = require('path');

/*=============== Get All Circulars ============================*/
module.exports.getAllCirculars = (req, res) => {
    try {
        Circulars.getAllCircular((error, data) => {
            res.status(200).json({ status: true, msg: 'Circular message successfully', result: data });
        });

    } catch (error) {
        res.status(201).json({ status: false, msg: error })
    }
}
/*============================ Add Circular ======================================*/
module.exports.addCircular = async (req, res) => {
    console.log(req.files);
    try {
        const { compId, title, message, status, date_formate, userId } = req.body;
        if (req.files) {
            let fileName = Date.now() + '_' + req.files.attachment.name;

            let newPath = path.join(process.cwd(), 'uploads/circulars', fileName);
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
            Circulars.createCircular(requestData, (error, message) => {
                console.log(message);
                if (message) {
                    res.status(200).json({ status: true, msg: "Circular data inserted successfully", data: message });
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
/*================================= Edit Circular By id ==================================*/
module.exports.editCircularMessage = async (req, res) => {
    try {
        let ID = req.body.id;
        console.log(ID)
        Circulars.getCircularMessageById(ID, (error, data) => {
            console.log(data);
            if (data != '') {
                res.status(200).json({ status: true, msg: "Circular Message Data fatch successfully", result: data });
            } else {
                res.status(201).json({ status: false, msg: "Circular Message ID not founds !" });

            }
        });
    } catch (e) {
        res.status(204).json({ status: false, msg: "Circular message ID not founds !" });
    }
};
/*======================================  updated Circular with & Without attachment ==================================================*/
module.exports.CircularMessageUpdate = async (req, res) => {
    console.log(req.files);
    try {
        let ID = req.body.id;
        let fileName = {};
        const { compId, title, message, status, date_formate, userId } = req.body;
        if (req.files) {
            fileName = Date.now() + '_' + req.files.attachment.name;
            let newPath = path.join(process.cwd(), 'uploads/circulars', fileName);
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
            Circulars.updateCircularWithIMGInfo(ID, requestData, (error, data) => {
                console.log(data);
                if (data.affectedRows > 0) {

                    res.status(200).json({ status: true, msg: 'Update Circular message successfully', result: data });
                } else {
                    res.status(201).json({ status: false, msg: 'Error for Update Circular message Id=' + ID });
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
            Circulars.updateCircularWithoutIMGInfo(ID, requestData, (error, data) => {
                console.log(data);
                if (data.affectedRows > 0) {

                    res.status(200).json({ status: true, msg: 'Update Circular message successfully', result: data });
                } else {
                    res.status(201).json({ status: false, msg: 'Error for Update Circular message Id=' + ID });
                }
            });
        }
    } catch (e) {
        res.status(204).json({ status: false, msg: 'Something went wrong!.' });

    }
};

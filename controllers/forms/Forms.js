var Forms = require('../../models/FormsModel');
var path = require('path');
/*=============== Get All forms ============================*/
module.exports.getAllForms = (req, res) => {
    try {
        const pageSize = 2;
        const page = parseInt(req.query.page) || 1;
        Forms.countFormsMessages((error1, total) => {
            Forms.getAllForms(page, pageSize, (error, data) => {
                res.status(200).json({
                    status: true,
                    msg: 'Forms message successfully',
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
/*============================ Add Forms ======================================*/
module.exports.addForms = async (req, res) => {
    try {
        const { compId, title, message, status, created_on, created_by } = req.body;
        if (req.files) {
            let fileName = Date.now() + '_' + req.files.attachment.name;
            let newPath = path.join(process.cwd(), 'uploads/forms', fileName);
            req.files.attachment.mv(newPath);

            var requestData = {
                comp_id: compId,
                title: title,
                message: message,
                attachment: fileName,
                status: status,
                created_on: created_on,
                created_by: created_by,
            }
            Forms.createForms(requestData, (error, message) => {
                console.log(message);
                if (message) {
                    res.status(200).json({ status: true, msg: "Forms data inserted successfully", data: message });
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
/*================================= Edit Fomrs By id ==================================*/
module.exports.editFormsMessage = async (req, res) => {
    try {
        let ID = req.body.id;

        Forms.getFormsMessageById(ID, (error, data) => {
            console.log(data);
            if (data != '') {
                res.status(200).json({ status: true, msg: "Fomrs Message Data fatch successfully", result: data[0] });
            } else {
                res.status(201).json({ status: false, msg: "Fomrs Message ID not founds !" });

            }
        });
    } catch (e) {
        res.status(204).json({ status: false, msg: "Fomrs message ID not founds !" });
    }
};
/*======================================  updated Fomrs with & Without attachment ==================================================*/
module.exports.FormsMessageUpdate = async (req, res) => {

    try {
        let ID = req.body.id;
        const { compId, title, message, status, updated_on, updated_by } = req.body;
        if (req.files) {
            let fileName = Date.now() + '_' + req.files.attachment.name;
            let newPath = path.join(process.cwd(), 'uploads/forms', fileName);
            req.files.attachment.mv(newPath);
            var requestData = {
                comp_id: compId,
                title: title,
                message: message,
                attachment: fileName,
                status: status,
                updated_on: updated_on,
                updated_by: updated_by,
            }
            Forms.updateFormsWithIMGInfo(ID, requestData, (error, data) => {
                console.log(data);
                if (data.affectedRows > 0) {

                    res.status(200).json({ status: true, msg: 'Update Forms message successfully', result: data });
                } else {
                    res.status(201).json({ status: false, msg: 'Error for Update Forms message Id=' + ID });
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
            Forms.updateFormsWithoutIMGInfo(ID, requestData, (error, data) => {
                console.log(data);
                if (data.affectedRows > 0) {

                    res.status(200).json({ status: true, msg: 'Update Forms message successfully', result: data });
                } else {
                    res.status(201).json({ status: false, msg: 'Error for Update Forms message Id=' + ID });
                }
            });
        }
    } catch (e) {
        res.status(204).json({ status: false, msg: 'Something went wrong!.' });

    }
};

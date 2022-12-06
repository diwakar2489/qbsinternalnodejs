var Forms = require('../../models/FormsModel');

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
        const { compId, title, message, attachment, status, date_formate, userId } = req.body;
        if (attachment) {

            var requestData = {
                comp_id: compId,
                title: title,
                message: message,
                attachment: attachment,
                status: status,
                created_on: date_formate,
                created_by: userId,
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
                res.status(200).json({ status: true, msg: "Fomrs Message Data fatch successfully", result: data });
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
        const { compId, title, message, attachment, status, date_formate, userId } = req.body;
        if (attachment) {

            var requestData = {
                comp_id: compId,
                title: title,
                message: message,
                attachment: attachment,
                status: status,
                updated_on: date_formate,
                updated_by: userId,
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
                updated_on: date_formate,
                updated_by: userId,
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

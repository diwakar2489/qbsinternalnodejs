var Policy = require('../../models/PolicyModel');

/*=============== Get All Policy ============================*/
module.exports.searchData = (req, res) => {
    try {
        const pageSize = 2;
        const search = req.query.query || 'test';
        const page = parseInt(req.query.page) || 1;
        Policy.countPolicyMessages((error1, total) => {
            Policy.getAllSearchPolicy(search,page, pageSize, (error, data) => {
                res.status(200).json({
                    status: true,
                    msg: 'Policy message successfully',
                    nbPages: total[0].Total,
                    page_no: page,
                    limit: pageSize,
                    hits: data
                });
            });
        });

    } catch (error) {
        res.status(201).json({ status: false, msg: error })
    }
}
/*=============== Get All Policy ============================*/
module.exports.getAllPolicy = (req, res) => {
    try {
        const pageSize = 2;
        const page = parseInt(req.query.page) || 1;
        Policy.countPolicyMessages((error1, total) => {
            Policy.getAllPolicy(page, pageSize, (error, data) => {
                res.status(200).json({
                    status: true,
                    msg: 'Policy message successfully',
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
/*============================ Add Policy ======================================*/
module.exports.addPolicy = async (req, res) => {
    try {
        const { compId, title, message, attachment, status, created_on, created_by } = req.body;
        if (attachment) {

            var requestData = {
                comp_id: compId,
                title: title,
                message: message,
                attachment: attachment,
                status: status,
                created_on: created_on,
                created_by: created_by,
            }
            Policy.createPolicy(requestData, (error, message) => {
                console.log(message);
                if (message) {
                    res.status(200).json({ status: true, msg: "Policy data inserted successfully", data: message });
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
/*================================= Edit Policy By id ==================================*/
module.exports.editPolicyMessage = async (req, res) => {
    try {
        let ID = req.body.id;

        Policy.getPolicyMessageById(ID, (error, data) => {
            console.log(data);
            if (data != '') {
                res.status(200).json({ status: true, msg: "Policy Message Data fatch successfully", result: data[0] });
            } else {
                res.status(201).json({ status: false, msg: "Policy Message ID not founds !" });

            }
        });
    } catch (e) {
        res.status(204).json({ status: false, msg: "Policy message ID not founds !" });
    }
};
/*======================================  updated Policy with & Without attachment ==================================================*/
module.exports.PolicyMessageUpdate = async (req, res) => {

    try {
        let ID = req.body.id;
        const { compId, title, message, attachment, status, updated_on, updated_by } = req.body;
        if (attachment) {

            var requestData = {
                comp_id: compId,
                title: title,
                message: message,
                attachment: attachment,
                status: status,
                updated_on: updated_on,
                updated_by: updated_by,
            }
            Policy.updatePolicyWithIMGInfo(ID, requestData, (error, data) => {
                console.log(data);
                if (data.affectedRows > 0) {

                    res.status(200).json({ status: true, msg: 'Update Policy message successfully', result: data });
                } else {
                    res.status(201).json({ status: false, msg: 'Error for Update Policy message Id=' + ID });
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
            Policy.updatePolicyWithoutIMGInfo(ID, requestData, (error, data) => {
                console.log(data);
                if (data.affectedRows > 0) {

                    res.status(200).json({ status: true, msg: 'Update Policy message successfully', result: data });
                } else {
                    res.status(201).json({ status: false, msg: 'Error for Update Policy message Id=' + ID });
                }
            });
        }
    } catch (e) {
        res.status(204).json({ status: false, msg: 'Something went wrong!.' });

    }
};

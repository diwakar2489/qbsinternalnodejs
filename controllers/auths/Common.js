var Common = require("../../models/CommonModel.js");


/*=============== Get All Companys ============================*/
module.exports.downloadFiles = async (req, res) => {
    try {
        res.status(200).json({ status: true, msg: 'request get successfully',url:'' });
        // Common.getAllCommonFiles((error, data) => {
        //     res.status(200).json({ status: true, msg: 'Company List fatch successfully', result: data });
        // });
    } catch (error) {
        res.status(201).json({ status: false, msg: error });
    }
};
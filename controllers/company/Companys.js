var Companys = require("../../models/CompanyModel.js");


/*=============== Get All Companys ============================*/
module.exports.companyList = async (req, res) => {
    try {
        Companys.getAllCompany((error, data) => {
            res.status(200).json({ status: true, msg: 'Company List fatch successfully', result: data });
        });
    } catch (error) {
        res.status(201).json({ status: false, msg: error });
    }
};
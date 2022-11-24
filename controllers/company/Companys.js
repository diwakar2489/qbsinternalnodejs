var Companys = require("../../models/CompanyModel.js");
module.exports.companyList = async (req, res) => {
    try {
        // const page = parseInt(req.query.page);
        // const size = parseInt(req.query.size);

        // const skip = (page -1) * size;
        //const total = await Companys.countOpenings();
        Companys.getAllCompany((error, data) => {
            res.status(200).json({ status: true, msg: 'Company List fatch successfully', result: data });
        });

    } catch (error) {
        res.status(201).json({ status: false, msg: error })
        // console.log(error);
    }
}
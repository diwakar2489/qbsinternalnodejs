var Departments = require("../../models/DepartmentModel.js");
module.exports.DepartmentList = async (req, res) => {
    try {
        Departments.getAllDepartment((error, data) => {
            res.status(200).json({ status: true, msg: 'Departments List fatch successfully', result: data });
        });

    } catch (error) {
        res.status(201).json({ status: false, msg: error })
        // console.log(error);
    }
}
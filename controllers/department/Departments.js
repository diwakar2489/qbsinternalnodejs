var Departments = require("../../models/DepartmentModel.js");
module.exports.DepartmentList = async (req, res) => {
    try {
        // const page = parseInt(req.query.page);
        // const size = parseInt(req.query.size);

        // const skip = (page -1) * size;
        //const total = await Departments.countOpenings();
        Departments.getAllDepartment((error, data) => {
            res.status(200).json({ status: true, msg: 'Departments List fatch successfully', result: data });
        });

    } catch (error) {
        res.status(201).json({ status: false, msg: error })
        // console.log(error);
    }
}
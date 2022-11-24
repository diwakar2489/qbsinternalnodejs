var Roles = require("../../models/RoleModel.js");
module.exports.getDepartmentWishRole = async (req, res) => {
    try {
        // const page = parseInt(req.query.page);
        // const size = parseInt(req.query.size);

        // const skip = (page -1) * size;
        //const total = await Roles.countOpenings();
        let ID = req.body.id;
        Roles.getAllRolesById(ID,(error, data) => {
            res.status(200).json({ status: true, msg: 'Roles List fatch successfully', result: data });
        });

    } catch (error) {
        res.status(201).json({ status: false, msg: error })
        // console.log(error);
    }
}
var Roles = require("../../models/RoleModel.js");

/*=============================== Get All Department Wish Role ==============================*/
module.exports.getDepartmentWishRole = async (req, res) => {
    try {

        let ID = req.body.id;
        Roles.getAllRolesById(ID, (error, data) => {
            if (data != '') {
                res.status(200).json({ status: true, msg: 'Roles List fatch successfully', result: data });
            } else {
                res.status(201).json({ status: false, msg: 'Worng Id send' });
            }

        });

    } catch (error) {
        res.status(201).json({ status: false, msg: error })
    }
}
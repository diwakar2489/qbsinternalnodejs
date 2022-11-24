var Openings = require("../../models/OpeningModel.js");


module.exports.List = async (req, res) => {
    try {
        Openings.getAllOpenings((error, data) => {
            res.status(200).json({ status: true, msg: 'Opening data fatch successfully', opening: data });
        });

    } catch (error) {
        res.status(201).json({ status: false, msg: error })
        // console.log(error);
    }
}

module.exports.Add = async (req, res) => {
    const { comp_id, dept_id, role_id, opening_limit, name, description, experience, created_on, created_by, status } = req.body;
    //const created_on = req.body.created_on ? req.body.created_on :'null';
    if (opening_limit == '' && name == '')
        return res.status(400).json({ status: false, msg: "field is requird" });
    try {
        var requestData = {
            comp_id: comp_id,
            dept_id: dept_id,
            role_id: role_id,
            opening_limit: opening_limit,
            name: name,
            description: description,
            experience: experience,
            created_on: created_on,
            created_by: created_by,
            status: status,
        }
        Openings.createProjectInfo(requestData, (error, opening) => {
            console.log(opening);
            res.json({ status: true, msg: "Opening data inserted successfully", data: opening });
        });

    } catch (error) {
        res.json({ status: false, msg: "Something went wrong!." });
    }
}
module.exports.Edit = async (req, res) => {

    try {
        let ID = req.body.id;
        console.log(ID)
        Openings.getOpeningsById(ID, (error, data) => {
            console.log(data);
            if (data != '') {
                res.status(200).json({ status: true, msg: "Opening Data fatch successfully", opening: data });
            } else {
                res.status(201).json({ status: false, msg: "Opening not founds !" });

            }
        });
    } catch (e) {
        res.status(204).json({ status: false, msg: "Opening ID not founds !" });
    }
};
module.exports.Update = async (req, res) => {
    try {
        let ID = req.body.id;
        var requestData = {
            comp_id: req.body.comp_id,
            dept_id: req.body.dept_id,
            role_id: req.body.role_id,
            opening_limit: req.body.opening_limit,
            name: req.body.name,
            description: req.body.description,
            experience: req.body.experience,
            updated_on: req.body.updated_on,
            updated_by: req.body.updated_by,
            status: req.body.status,
        }
        Openings.updateOpeningInfo(ID, requestData, (error, data) => {
            console.log(data);
            if (data) {

                res.status(200).json({ status: true, msg: 'Update opening successfully', result: data });
            } else {
                res.status(201).json({ status: false, msg: 'Error for Update opening' });
            }
        });
    } catch (e) {
        //console.log(e.message);
        res.status(204).json({ status: false, msg: 'Something went wrong!.' });

    }
};
var Openings = require("../../models/OpeningModel.js");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

// module.exports.getOpenings = async (req, res) => {
//     try {
//         const users = await Users.findAll({
//             attributes: ['id', 'name', 'email']
//         });
//         res.json(users);
//     } catch (error) {
//         console.log(error);
//     }
// }

module.exports.CreateOpening = async (req, res) => {
    const { dept_id, role_id, opening_limit, name,description,created_by } = req.body;
    if (opening_limit == '' && name == '')
        return res.status(400).json({ msg: "field is requird" });
    try {
        var requestData = {
            dept_id:dept_id,
            role_id:role_id,
            opening_limit:opening_limit,
            name:name,
            description:description,
            created_by:created_by,
            status:'1',
        }
        Openings.createProjectInfo(requestData,(error, opening) => {
            console.log(opening);
            res.json({ msg: "opening data inserted successfully",data:opening });  
        });
        
    } catch (error) {
        console.log(error);
    }
}
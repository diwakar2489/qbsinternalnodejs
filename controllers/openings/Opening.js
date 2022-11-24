var Openings = require("../../models/OpeningModel.js");


module.exports.getOpenings = async (req, res) => {
    try {
         Openings.getAllOpenings((error,data) =>{
            res.status(200).json({msg:'Opening data fatch successfully',opening:data});
        });
        
    } catch (error) {
        res.status(201).json({msg:error})
       // console.log(error);
    }
}

module.exports.CreateOpening = async (req, res) => {
    const { comp_id,dept_id, role_id, opening_limit, name,description,experience,created_by } = req.body;
    if (opening_limit == '' && name == '')
        return res.status(400).json({ msg: "field is requird" });
    try {
        var requestData = {
            comp_id:comp_id,
            dept_id:dept_id,
            role_id:role_id,
            opening_limit:opening_limit,
            name:name,
            description:description,
            experience:experience,
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
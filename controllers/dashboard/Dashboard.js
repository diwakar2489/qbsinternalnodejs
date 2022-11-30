var Dashboard = require("../../models/DashboardModel.js");
var path = require('path');

module.exports.addMessage = async (req, res) => {
    const { compId, UserId, fromEmail, UserMessage, OtherMessage, status, created_on, created_by } = req.body;
    let fileName = Date.now() + '_' + req.files.profiles.name;
    //console.log('fdsfsf'+fileName)
    let newPath = path.join(process.cwd(), 'uploads/dashboards', fileName);
    req.files.profiles.mv(newPath);
    console.log(req.files);
    var requestData = {
        comp_id: compId,
        UserId: UserId,
        fromEmail: fromEmail,
        UserMessage: UserMessage,
        OtherMessage: OtherMessage,
        photo: fileName,
        status: status,
        created_on: created_on,
        created_by: created_by,
    }
    Dashboard.createMessage(requestData, (error, message) => {
        console.log(message);
        res.json({ status: true, msg: "Message data inserted successfully", data: message });
    });
}
// module.exports.DashboardMessage = async (req, res) => {
//     try {
//         Dashboard.getAllDashboard((error, data) => {
//             res.status(200).json({ status: true, msg: 'Dashboard message successfully', result: data });
//         });

//     } catch (error) {
//         res.status(201).json({ status: false, msg: error })
//         // console.log(error);
//     }
// }
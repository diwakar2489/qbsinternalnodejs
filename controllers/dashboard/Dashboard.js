var Dashboard = require("../../models/DashboardModel.js");
var path = require('path');

module.exports.addMessage = async (req, res) => {
    try {
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
            if (message) {
                res.status(200).json({ status: true, msg: "Message data inserted successfully", data: message });
            } else {
                res.status(201).json({ status: false, msg: "Something Went Wrong" });
            }

        });
    } catch (error) {
        res.status(400).json({ status: false, msg: "Something Went Wrong" });
        console.log(error);
    }
}
module.exports.DashboardMessage = async (req, res) => {
    try {
        Dashboard.getAllDashboard((error, data) => {
            res.status(200).json({ status: true, msg: 'Dashboard message successfully', result: data });
        });

    } catch (error) {
        res.status(201).json({ status: false, msg: error })
        // console.log(error);
    }
}
module.exports.editMessage = async (req, res) => {

    try {
        let ID = req.body.id;
        console.log(ID)
        Dashboard.getMessageById(ID, (error, data) => {
            console.log(data);
            if (data != '') {
                res.status(200).json({ status: true, msg: "Dashboard Message Data fatch successfully", result: data });
            } else {
                res.status(201).json({ status: false, msg: "Dashboard Message ID not founds !" });

            }
        });
    } catch (e) {
        res.status(204).json({ status: false, msg: "Dashboard message ID not founds !" });
    }
};
module.exports.DashboardMessageUpdate = async (req, res) => {
    try {
        let ID = req.body.id;
        const { compId, UserId, fromEmail, UserMessage, OtherMessage, status, updated_on, updated_by } = req.body;
        let fileName = Date.now() + '_' + req.files.profiles.name;
        //console.log('fdsfsf'+fileName)
        let newPath = path.join(process.cwd(), 'uploads/dashboards', fileName);
        req.files.profiles.mv(newPath);
       // console.log(req.files);
        var requestData = {
            comp_id: compId,
            UserId: UserId,
            fromEmail: fromEmail,
            UserMessage: UserMessage,
            OtherMessage: OtherMessage,
            photo: fileName,
            status: status,
            updated_on: updated_on,
            updated_by: updated_by,
        }
        Dashboard.updateDashboardMessageInfo(ID, requestData, (error, data) => {
            console.log(data);
            if (data) {

                res.status(200).json({ status: true, msg: 'Update Dashboard message successfully', result: data });
            } else {
                res.status(201).json({ status: false, msg: 'Error for Update Dashboard message' });
            }
        });
    } catch (e) {
        //console.log(e.message);
        res.status(204).json({ status: false, msg: 'Something went wrong!.' });

    }
};
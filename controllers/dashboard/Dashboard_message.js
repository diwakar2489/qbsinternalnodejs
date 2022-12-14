var Dashboard = require("../../models/DashboardModel.js");
var path = require('path');

/*=============== Get Search Dashboard Messages ============================*/
module.exports.searchDashboardMessagesData = async (req, res) => {
    try {
        const pageSize = 3;
        const search = req.query.query || '' ;
        const page = parseInt(req.query.page);
        Dashboard.countDashboardMessages((error1, total) => {
            Dashboard.getSearchDashboard(search,page,pageSize,total,(error, data) => {
                res.status(200).json({ 
                    status: true,
                    msg: 'Dashboard message successfully',
                    nbPages:total[0].Total, 
                    page: page,
                    limit: pageSize,
                    dashboard: data });
            });
        });

    } catch (error) {
        res.status(201).json({ status: false, msg: error })
    }
}
/*=============== Get All Dashboard Messages ============================*/
module.exports.DashboardMessage = async (req, res) => {
    try {
        const pageSize = 2;
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * pageSize;
        Dashboard.countDashboardMessages((error1, total) => {
            Dashboard.getAllDashboard(page,pageSize,total,(error, data) => {
                res.status(200).json({ 
                    status: true,
                    msg: 'Dashboard message successfully',
                    TotalRecords:total, 
                    page_no:page, 
                    limit:pageSize,
                    result: data });
            });
        });

    } catch (error) {
        res.status(201).json({ status: false, msg: error })
    }
}
/*============================ Add Dashboard Messages ======================================*/
module.exports.addMessage = async (req, res) => {
    try {
        const { compId, title, message, profiles, status, created_on, created_by } = req.body;
        if (profiles) {

            // let fileName = Date.now() + '_' + req.files.profiles.name;
            // let newPath = path.join(process.cwd(), 'uploads/dashboards', fileName);
            // req.files.profiles.mv(newPath);

            var requestData = {
                comp_id: compId,
                title: title,
                message: message,
                photo: profiles,
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

        } else {
            return res.status(201).json({ status: false, msg: "Image field is required" });
        }
    } catch (error) {
        res.status(400).json({ status: false, msg: "Something Went Wrong" });
        console.log(error);
    }
}
/*================================= Edit Dashboard message By id ==================================*/
module.exports.editMessage = async (req, res) => {
    try {
        let ID = req.body.id;

        Dashboard.getMessageById(ID, (error, data) => {
            console.log(data);
            if (data != '') {
                res.status(200).json({ status: true, msg: "Dashboard Message Data fatch successfully", result: data[0] });
            } else {
                res.status(201).json({ status: false, msg: "Dashboard Message ID not founds !" });

            }
        });
    } catch (e) {
        res.status(204).json({ status: false, msg: "Dashboard message ID not founds !" });
    }
};
/*===================  updated Dashboard message with & Without attachment ======================*/
module.exports.DashboardMessageUpdate = async (req, res) => {

    try {
        let ID = req.body.id;
        let fileName = {};
        const { compId, title, message, profiles, status, updated_on, updated_by } = req.body;
        if (profiles) {
            // fileName = Date.now() + '_' + req.files.profiles.name;
            // let newPath = path.join(process.cwd(), 'uploads/dashboards', fileName);
            // req.files.profiles.mv(newPath);
            var requestData = {
                comp_id: compId,
                title: title,
                message: message,
                photo: profiles,
                status: status,
                updated_on: updated_on,
                updated_by: updated_by,
            }
            Dashboard.updateDashboardWithIMGInfo(ID, requestData, (error, data) => {
                console.log(data);
                if (data) {

                    res.status(200).json({ status: true, msg: 'Update Dashboard message successfully', result: data });
                } else {
                    res.status(201).json({ status: false, msg: 'Error for Update Dashboard message' });
                }
            });

        } else {
            var requestData = {
                comp_id: compId,
                title: title,
                message: message,
                status: status,
                updated_on: updated_on,
                updated_by: updated_by,
            }
            Dashboard.updateDashboardWithoutIMGInfo(ID, requestData, (error, data) => {
                console.log(data);
                if (data) {

                    res.status(200).json({ status: true, msg: 'Update Dashboard message successfully', result: data });
                } else {
                    res.status(201).json({ status: false, msg: 'Error for Update Dashboard message' });
                }
            });
        }

    } catch (e) {
        res.status(204).json({ status: false, msg: 'Something went wrong!.' });
    }
};
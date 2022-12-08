var Dashboard = require("../../models/DashboardModel.js");
var Forms = require("../../models/FormsModel.js");

/*======================== Get Dashboard Data List========================*/
module.exports.DashboardUserMessage = async (req, res) => {
    try {
        Dashboard.getDashboardUserMessage((error, data) => {
            res.status(200).json({ 
                status: true,
                msg: 'Dashboard User Data fetch successfully',
                result: data });
        });
    } catch (error) {
        res.status(201).json({ status: false, msg: error })
    }
}
/*======================== Get Dashboard Data List========================*/
module.exports.DashboardFormsList = async (req, res) => {
    try {
        Forms.getDashboardFormsData((error, data) => {
            res.status(200).json({ 
                status: true,
                msg: 'Dashboard User Form Data fetch successfully',
                result: data });
        });
    } catch (error) {
        res.status(201).json({ status: false, msg: error })
    }
}
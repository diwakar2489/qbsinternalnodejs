var Dashboard = require("../../models/DashboardModel.js");
var Forms = require("../../models/FormsModel.js");
var Opening = require("../../models/OpeningModel.js");
var Circular = require("../../models/CircularModel.js");

/*======================== Get Dashboard Message Data List========================*/
module.exports.DashboardUserMessage = async (req, res) => {
    try {
        Dashboard.getDashboardUserMessage((error, data) => {
            console.log(data)
            res.status(200).json({
                status: true,
                msg: 'User Dashboard Message Data fetch successfully',
                result: data
            });
        });
    } catch (error) {
        res.status(201).json({ status: false, msg: error })
    }
}
/*======================== Get Dashboard Forms Data List========================*/
module.exports.DashboardFormsList = async (req, res) => {
    try {
        const pageSize = 2;
        const page = parseInt(req.query.page);
        Forms.countFormsMessages((error1, total) => {
            Forms.getDashboardFormsData(page, pageSize,(error, data) => {
                res.status(200).json({
                    status: true,
                    msg: 'User Dashboard Form Data fetch successfully',
                    nbPages: total[0].Total,
                    page: page,
                    limit: pageSize,
                    result: data
                });
            });
        });
    } catch (error) {
        res.status(201).json({ status: false, msg: error })
    }
}
/*======================== Get Dashboard Opening Data List========================*/
module.exports.DashboardOpeningList = async (req, res) => {
    try {
        const pageSize = 2;
        const page = parseInt(req.query.page);
        //const skip = (page-1)*pageSize;
        Opening.countOpenings((error1, total) => {
            Opening.dashboardOpeningsList(page, pageSize,(error, data) => {
                res.status(200).json({
                    status: true,
                    msg: 'User Dashboard Message Data fetch successfully',
                    nbPages: total[0].Total,
                    page: page,
                    limit: pageSize,
                    result: data
                });
            });
        });
    } catch (error) {
        res.status(201).json({ status: false, msg: error })
    }
}
/*======================== Get Dashboard Circular Data List========================*/
module.exports.DashboardCircularList = async (req, res) => {
    try {
        const UserID = req.body.userId;
            Circular.dashboardCircularList(UserID,(error, data) => {
                res.status(200).json({
                    status: true,
                    msg: 'User Dashboard Circular Data fetch successfully',
                    result: data
                });
            });
    } catch (error) {
        res.status(201).json({ status: false, msg: error })
    }
}
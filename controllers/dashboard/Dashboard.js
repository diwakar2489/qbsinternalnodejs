var Dashboard = require("../../models/DashboardModel.js");
var path = require('path');

module.exports.addMessage = async (req, res) => {
    try {
        const { compId, title, message, status, date_formate, userId } = req.body;
        if(req.files){
            let fileName = Date.now() + '_' + req.files.profiles.name;
            //console.log('fdsfsf'+fileName)
        
            let newPath = path.join(process.cwd(), 'uploads/dashboards', fileName);
            req.files.profiles.mv(newPath);
            console.log(req.files);
            var requestData = {
                comp_id: compId,
                title: title,
                message: message,
                photo:fileName,
                status: status,
                created_on: date_formate,
                created_by: userId,
            }
            Dashboard.createMessage(requestData, (error, message) => {
                console.log(message);
                if (message) {
                    res.status(200).json({ status: true, msg: "Message data inserted successfully", data: message });
                } else {
                    res.status(201).json({ status: false, msg: "Something Went Wrong" });
                }
    
            });
           
        }else{
            return res.status(201).json({ status: false, msg: "Image field is required" });
        }
        
        
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
    console.log(req.files);
    try {
       // console.log(req.body);
        let ID = req.body.id;
        let fileName = {};
        const { compId, title, message, status, date_formate, userId } = req.body;
        if(req.files){
            fileName = Date.now() + '_' + req.files.profiles.name;
           // console.log('fdsfsf'+fileName)
            let newPath = path.join(process.cwd(), 'uploads/dashboards', fileName);
            req.files.profiles.mv(newPath);
            var requestData = {
                comp_id: compId,
                title: title,
                message: message,
                photo: fileName,
                status: status,
                updated_on: date_formate,
                updated_by: userId,
            }
            Dashboard.updateDashboardMessageInfo(ID, requestData, (error, data) => {
                console.log(data);
                if (data) {
    
                    res.status(200).json({ status: true, msg: 'Update Dashboard message successfully', result: data });
                } else {
                    res.status(201).json({ status: false, msg: 'Error for Update Dashboard message' });
                }
            });
            
        }else{
            var requestData = {
                comp_id: compId,
                title: title,
                message: message,
                status: status,
                updated_on: date_formate,
                updated_by: userId,
            }
            Dashboard.updateDashboardMessageInfo(ID, requestData, (error, data) => {
                console.log(data);
                if (data) {
    
                    res.status(200).json({ status: true, msg: 'Update Dashboard message successfully', result: data });
                } else {
                    res.status(201).json({ status: false, msg: 'Error for Update Dashboard message' });
                }
            });
        }
       
    } catch (e) {
        //console.log(e.message);
        res.status(204).json({ status: false, msg: 'Something went wrong!.' });

    }
};
var express = require("express");
var { Login, Logout, ForgotPass, verifyOtp, changePassword } = require("../controllers/auths/Users.js");

var {DashboardMessage,addMessage,editMessage,DashboardMessageUpdate} = require("../controllers/dashboard/Dashboard");

var { List,Add,Edit,Update } = require("../controllers/openings/Opening.js");

var { getAllBulletins, addBulletin, editBulletinMessage, BulletinMessageUpdate} = require('../controllers/bulletin/Bulletins.js');

var { companyList } = require("../controllers/company/Companys.js");
var { DepartmentList } = require("../controllers/department/Departments.js");
var { getDepartmentWishRole } = require("../controllers/roles/Roles.js");

var { verifyToken } = require("../middleware/VerifyToken.js");
var { refreshToken } =  require("../controllers/auths/RefreshToken.js");

var fileUploads = require("express-fileupload");


const router = express.Router();
router.use(fileUploads({
    useTempFiles : true,
    tempFileDir : 'uploads/'
}));
//router.post('/users', verifyToken,Register);
router.get('/token', refreshToken);

router.post('/login', Login);
router.delete('/logout', Logout);
router.post('/forgot-password', ForgotPass);
router.post('/otp-verify', verifyOtp);
router.put('/change-password', changePassword);

router.get('/messages',verifyToken,DashboardMessage);
router.post('/add_messages',verifyToken,addMessage);
router.post('/edit_messages',verifyToken,editMessage);
router.put('/update_messages',verifyToken,DashboardMessageUpdate);

router.get('/bulletin',verifyToken,getAllBulletins);
router.post('/add_bulletin',verifyToken,addBulletin);
router.post('/edit_bulletin',verifyToken,editBulletinMessage);
router.put('/update_bulletin',verifyToken,BulletinMessageUpdate);

router.get('/opening', verifyToken, List);
router.post('/add_opening',verifyToken,Add);
router.post('/edit',verifyToken,Edit);
router.put('/update_opening',verifyToken,Update);

router.get('/company_list', verifyToken, companyList);
router.get('/department_list', verifyToken, DepartmentList);
router.put('/get_department_role',verifyToken,getDepartmentWishRole);

module.exports = router;
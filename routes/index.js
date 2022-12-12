var express = require("express");

var { companyList } = require("../controllers/company/Companys.js");
var { DepartmentList } = require("../controllers/department/Departments.js");
var { getDepartmentWishRole } = require("../controllers/roles/Roles.js");
var { verifyToken } = require("../middleware/VerifyToken.js");


var fileUploads = require("express-fileupload");
const router = express.Router();

router.use(fileUploads({
    useTempFiles : true,
    tempFileDir : 'uploads/'
}));

/*=================== Login routers =====================*/
var { Login, Logout, ForgotPass, verifyOtp, changePassword } = require("../controllers/auths/Users.js");
var { refreshToken } =  require("../controllers/auths/RefreshToken.js");

router.get('/token', refreshToken);
router.post('/login', Login);
router.delete('/logout:token', Logout);
router.post('/forgot-password', ForgotPass);
router.post('/otp-verify', verifyOtp);
router.put('/change-password', changePassword);

/*=================== Dashboard routers =====================*/
var {DashboardUserMessage, DashboardFormsList, DashboardOpeningList, DashboardCircularList} = require("../controllers/dashboard/Dashboard");

router.get('/dashboard_messages',verifyToken, DashboardUserMessage);
router.get('/dashboard_forms',verifyToken, DashboardFormsList);
router.get('/dashboard_opening',verifyToken, DashboardOpeningList);
router.get('/dashboard_circular',verifyToken, DashboardCircularList);
/*=================== Dashboard Message routers =====================*/
var {DashboardMessage,addMessage,editMessage,DashboardMessageUpdate} = require("../controllers/dashboard/Dashboard_message");

router.get('/messages',verifyToken, DashboardMessage);
router.post('/add_messages',verifyToken, addMessage);
router.post('/edit_messages',verifyToken, editMessage);
router.put('/update_messages',verifyToken, DashboardMessageUpdate);

/*=================== Bulletin routers =====================*/
var { getAllBulletins, addBulletin, editBulletinMessage, BulletinMessageUpdate} = require('../controllers/bulletin/Bulletins.js');

router.get('/bulletin',verifyToken,getAllBulletins);
router.post('/add_bulletin',verifyToken,addBulletin);
router.post('/edit_bulletin',verifyToken,editBulletinMessage);
router.put('/update_bulletin',verifyToken,BulletinMessageUpdate);

/*=================== Circular routers =====================*/
var { getAllCirculars, addCircular, editCircularMessage, CircularMessageUpdate} = require('../controllers/circulars/Circulars.js');

router.get('/circular',verifyToken,getAllCirculars);
router.post('/add_circular',verifyToken,addCircular);
router.post('/edit_circular',verifyToken,editCircularMessage);
router.put('/update_circular',verifyToken,CircularMessageUpdate);

/*=================== Forms routers =====================*/
var { getAllForms, addForms, editFormsMessage, FormsMessageUpdate} = require('../controllers/forms/Forms.js');

router.get('/forms',verifyToken,getAllForms);
router.post('/add_forms',verifyToken,addForms);
router.post('/edit_forms',verifyToken,editFormsMessage);
router.put('/update_forms',verifyToken,FormsMessageUpdate);

/*=================== Policy routers =====================*/
var { searchData, getAllPolicy, addPolicy, editPolicyMessage, PolicyMessageUpdate} = require('../controllers/policy/Policy.js');

router.get('/search',searchData);
router.get('/policy',verifyToken,getAllPolicy);
router.post('/add_policy',verifyToken,addPolicy);
router.post('/edit_policy',verifyToken,editPolicyMessage);
router.put('/update_policy',verifyToken,PolicyMessageUpdate);

/*=================== Job Opening routers =====================*/
var { searchOpeningData,List,Add,Edit,Update } = require("../controllers/openings/Opening.js");

router.get('/search_opening',searchOpeningData);
router.get('/opening', verifyToken, List);
router.post('/add_opening',verifyToken,Add);
router.post('/edit_opening',verifyToken,Edit);
router.put('/update_opening',verifyToken,Update);

/*=================== Common List routers =====================*/
router.get('/company_list', verifyToken, companyList);
router.get('/department_list', verifyToken, DepartmentList);
router.put('/get_department_role',verifyToken,getDepartmentWishRole);

module.exports = router;
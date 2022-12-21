var express = require("express");

var { companyList } = require("../controllers/company/Companys.js");
var { DepartmentList } = require("../controllers/department/Departments.js");
var { getDepartmentWishRole } = require("../controllers/roles/Roles.js");
var { verifyToken } = require("../middleware/VerifyToken.js");
var { downloadFiles } = require("../controllers/auths/Common.js")

var fileUploads = require("express-fileupload");
const router = express.Router();

router.use(fileUploads({
    useTempFiles : true,
    tempFileDir : 'uploads/'
}));

/*=================== Login routers =====================*/
var { Login, addUser,addLinkUser,UserLinkVerify,UserLinkList,UserLinksDetailsUpdate, getUser, editUsers, UserDetailsUpdate, Logout, ForgotPass, verifyOtp, changePassword } = require("../controllers/auths/Users.js");
var { refreshToken } =  require("../controllers/auths/RefreshToken.js");

router.get('/token', refreshToken);
router.post('/login', Login);
router.delete('/logout:token', Logout);
router.post('/forgot-password', ForgotPass);
router.post('/otp-verify', verifyOtp);
router.put('/change-password', changePassword);

router.post('/user_link_create',verifyToken, addLinkUser);
router.post('/user_link_verify', UserLinkVerify);
router.get('/user_link_list',verifyToken, UserLinkList);
router.put('/user_link_details_update', UserLinksDetailsUpdate);

router.post('/user_register',verifyToken, addUser)
router.get('/users',verifyToken, getUser)
router.post('/edit_users',verifyToken, editUsers)
router.put('/update_users',verifyToken, UserDetailsUpdate)

/*=================== Dashboard routers =====================*/
var {DashboardUserMessage, DashboardFormsList, DashboardOpeningList, DashboardCircularList} = require("../controllers/dashboard/Dashboard");

router.get('/dashboard_messages',verifyToken, DashboardUserMessage);
router.get('/dashboard_forms',verifyToken, DashboardFormsList);
router.get('/dashboard_opening',verifyToken, DashboardOpeningList);
router.get('/dashboard_circular',verifyToken, DashboardCircularList);
/*=================== Dashboard Message routers =====================*/
var {searchDashboardMessagesData,DashboardMessage,addMessage,editMessage,DashboardMessageUpdate} = require("../controllers/dashboard/Dashboard_message");
router.get('/search_messages',searchDashboardMessagesData);
router.get('/messages', DashboardMessage);

router.post('/add_messages',verifyToken, addMessage);
router.post('/edit_messages',verifyToken, editMessage);
router.put('/update_messages',verifyToken, DashboardMessageUpdate);

/*=================== Bulletin routers =====================*/
var { searchBulletinData, getAllBulletins, addBulletin, editBulletinMessage, BulletinMessageUpdate} = require('../controllers/bulletin/Bulletins.js');

router.get('/search_bulletin',searchBulletinData);
router.get('/bulletin',verifyToken,getAllBulletins);
router.post('/add_bulletin',verifyToken,addBulletin);
router.post('/edit_bulletin',verifyToken,editBulletinMessage);
router.put('/update_bulletin',verifyToken,BulletinMessageUpdate);

/*=================== Circular routers =====================*/
var { searchCircularData, getAllCirculars, addCircular, editCircularMessage, CircularMessageUpdate} = require('../controllers/circulars/Circulars.js');

router.get('/search_circular',searchCircularData);
router.get('/circular',verifyToken,getAllCirculars);
router.post('/add_circular',verifyToken,addCircular);
router.post('/edit_circular',verifyToken,editCircularMessage);
router.put('/update_circular',verifyToken,CircularMessageUpdate);

/*=================== Forms routers =====================*/
var { searchFormsData,getAllForms, addForms, editFormsMessage, FormsMessageUpdate} = require('../controllers/forms/Forms.js');

router.get('/search_forms',searchFormsData);
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

/*=================== Directory List routers =====================*/
var { searchDirectoryData } = require("../controllers/directory/Directory.js");

router.get('/search_directory',searchDirectoryData);

/*=================== Common List routers =====================*/
router.get('/download_files', verifyToken, downloadFiles);
router.get('/company_list', verifyToken, companyList);
router.get('/department_list', verifyToken, DepartmentList);
router.put('/get_department_role',verifyToken,getDepartmentWishRole);

module.exports = router;
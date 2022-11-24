var express = require("express");
var { Login, Logout } = require("../controllers/auths/Users.js");
var { List,Add,Edit,Update } = require("../controllers/openings/Opening.js");

var { companyList } = require("../controllers/company/Companys.js");
var { DepartmentList } = require("../controllers/department/Departments.js");
var { getDepartmentWishRole } = require("../controllers/roles/Roles.js");

var { verifyToken } = require("../middleware/VerifyToken.js");
//var { refreshToken } =  require("../controllers/auths/RefreshToken.js");

const router = express.Router();

//router.get('/users', verifyToken, getUsers);
//router.post('/users', verifyToken,Register);
//router.get('/token', refreshToken);

router.post('/login', Login);
router.delete('/logout', Logout);

router.get('/opening', verifyToken, List);
router.post('/add_opening',verifyToken,Add);
router.post('/edit',verifyToken,Edit);
router.put('/update_opening',verifyToken,Update);

router.get('/company_list', verifyToken, companyList);
router.get('/department_list', verifyToken, DepartmentList);
router.put('/get_department_role',verifyToken,getDepartmentWishRole);

module.exports = router;
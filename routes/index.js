var express = require("express");
var { Login, Logout } = require("../controllers/auths/Users.js");
var { CreateOpening } = require("../controllers/openings/Opening.js");
var { verifyToken } = require("../middleware/VerifyToken.js");
var { refreshToken } =  require("../controllers/auths/RefreshToken.js");

const router = express.Router();

//router.get('/users', verifyToken, getUsers);
//router.post('/users', verifyToken,Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
router.post('/add_opening',verifyToken,CreateOpening);

module.exports = router;
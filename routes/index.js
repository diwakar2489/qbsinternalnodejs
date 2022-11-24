var express = require("express");
var { Login, Logout } = require("../controllers/auths/Users.js");
var { getOpenings,CreateOpening } = require("../controllers/openings/Opening.js");
var { verifyToken } = require("../middleware/VerifyToken.js");
//var { refreshToken } =  require("../controllers/auths/RefreshToken.js");

const router = express.Router();

//router.get('/users', verifyToken, getUsers);
//router.post('/users', verifyToken,Register);
//router.get('/token', refreshToken);

router.post('/login', Login);
router.delete('/logout', Logout);

router.get('/opening', verifyToken, getOpenings);
router.post('/add_opening',verifyToken,CreateOpening);

module.exports = router;
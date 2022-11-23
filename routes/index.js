var express = require("express");
var { getUsers, Register, Login, Logout } = require("../controllers/Users.js");
var { verifyToken } = require("../middleware/VerifyToken.js");
var { refreshToken } =  require("../controllers/RefreshToken.js");

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/users', verifyToken,Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

module.exports = router;
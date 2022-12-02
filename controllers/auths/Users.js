var Users = require("../../models/UserModel.js");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var nodemailer = require('nodemailer');

/*=============== User Login =======================*/
module.exports.Login = async (req, res) => {
    try {
        let emailID = req.body.email;
        Users.getUsersById(emailID, async (error, user) => {
            if (user == '') {
                return res.status(400).json({ status: false, msg: "Invaild Username !" });
            } else {
                const password = req.body.password;
                const match = await bcrypt.compare(password, user[0].password);
                if (!match)
                    return res.status(400).json({ status: false, msg: "Wrong Password !" });

                const userId = user[0].id;
                const name = user[0].name;
                const email = user[0].email;
                const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: '1d'
                });

                const refreshToken = jwt.sign({ userId, name, email }, process.env.REFRESH_TOKEN_SECRET, {
                    expiresIn: '1d'
                });
                var requestData = {
                    refresh_token: refreshToken,
                }
                Users.updateUsersInfo(userId, requestData, (error, UserInfo) => {
                    console.log('update refreshToken')
                });

                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000
                });
                res.status(200).json({ status: true, msg: 'user logged in successfully', accessToken });
            }
        });
    } catch (error) {
        console.log(error)
        res.status(404).json({ status: false, msg: "Invalid Credentials !" });
    }
}
/*=============== User Forgot password ============================*/
module.exports.ForgotPass = async (req, res) => {
    const { email } = req.body;
    Users.getUsersById(email, (err, result) => {
        if (result != '') {

            let otpcode = Math.floor((Math.random() * 10000) + 1);
            let OtpData = {
                email: req.body.email,
                code: otpcode,
                expiresIn: new Date().getTime() + 300 * 1000
            }
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'diwakarmahidon3@gmail.com',
                    pass: 'liswuhwnkyuoraso'
                }
            });

            var mailOptions = {
                from: 'diwakarmahidon3@gmail.com',
                to: 'diwakar.pandey@qbslearning.com',
                subject: 'verify otp',
                text: `Your otp id ${otpcode}`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            Users.createUserOtp(OtpData, (error, UserInfo) => {
                res.status(200).json({ status: true, msg: 'please check your email id' });

            });

        } else {
            res.status(200).json({ status: false, msg: 'email id is not vaild' });
        }

    });


};
/*=============== User Otp verify ============================*/
module.exports.verifyOtp = async (req, res) => {
    const { email, code } = req.body;
    Users.getUsersOtpCodeByEmail(email, code, (err, data) => {
        if (data != '') {
            let currentTime = new Date().getTime();
            let diff = data[0].expiresIn - currentTime;
            if (diff < 0) {
                res.status(201).json({ status: false, msg: "Otp time expires" });
            } else {
                res.status(201).json({ status: true, msg: "Otp verify Successfully" });
            }
        } else {
            res.status(201).json({ status: false, msg: "OTP is not vaild please check" });
        }
    });
};
/*=============== Change User password ============================*/
module.exports.changePassword = async (req, res) => {
    const { email, password } = req.body;
    Users.getUsersByEmail(email, async (err, data) => {
        if (data != '') {
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password, salt);
            const updateData = {
                password: hashPassword
            }
            Users.forgotPassword(email, updateData, (err, UserInfo) => {
                if (UserInfo) {
                    res.status(200).json({ status: true, msg: "Password update successfully" });
                } else {
                    res.status(201).json({ status: false, msg: "Something Went Wrong" });
                }
            })
        } else {
            res.status(400).json({ status: false, msg: "Not Match email id" });
        }
    });
}
/*=============== User Logout ========================*/
module.exports.Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(204);
    Users.getUsersByRefreshToken(refreshToken, (error, UserInfo) => {

        if (!UserInfo[0]) return res.status(204);
        const userId = UserInfo[0].id;
        Users.updateUsersInfo(userId, { refresh_token: null }, (error, UserInfo) => {
            res.status(400).json({ status: false, msg: "update refreshToken" });
        });
        res.clearCookie('refreshToken');
        return res.status(200);
    });

}
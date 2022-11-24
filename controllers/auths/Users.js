var Users = require("../../models/UserModel.js");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

// module.exports.getUsers = async (req, res) => {
//     try {
//         const users = await Users.findAll({
//             attributes: ['id', 'name', 'email']
//         });
//         res.json(users);
//     } catch (error) {
//         console.log(error);
//     }
// }

// module.exports.Register = async (req, res) => {
//     const { name, email, password, confPassword } = req.body;
//     if (password !== confPassword)
//         return res.status(400).json({ msg: "Password and Confirm Password not match" });
//     const salt = await bcrypt.genSalt();
//     const hashPassword = await bcrypt.hash(password, salt);
//     try {
//         await Users.create({
//             name: name,
//             email: email,
//             password: hashPassword
//         });
//         res.json({ msg: "Register Berhasil" });
//     } catch (error) {
//         console.log(error);
//     }
// }

module.exports.Login = async (req, res) => {
    //console.log(req.body)
    try {
        let emailID = req.body.email;
        Users.getUsersById(emailID, async (error, user) => {

            if (user == '') {
                return res.status(400).json({ msg: "Invaild Username !" });
            } else {

                const password = req.body.password;
                const match = await bcrypt.compare(password, user[0].password);
                console.log(match)
                //   console.log('password'+password);
                //   console.log(match);
                //   console.log('haspass'+user[0].password);

                if (!match)
                    return res.status(400).json({ msg: "Wrong Password !" });

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
                    maxAge:  24 * 60 * 60 * 1000
                });
                console.log('login SuccessFully')
                res.json({ accessToken });
            }



        });
    } catch (error) {
        console.log(error)
        res.status(404).json({ msg: "Invalid Credentials !" });
    }
}

module.exports.Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    Users.getUsersByRefreshToken(refreshToken, (error, UserInfo) => {

        if (!UserInfo[0]) return res.sendStatus(204);
        const userId = UserInfo[0].id;
        Users.updateUsersInfo(userId, { refresh_token: null }, (error, UserInfo) => {
            console.log('update refreshToken')
        });
        res.clearCookie('refreshToken');
        return res.sendStatus(200);
    });

}
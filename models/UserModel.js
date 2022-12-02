
var dbConn = require("../config/mysql_connection.js");
var Users = function (list) {
    this.id = list.id;
    this.email = list.email;
    this.dept = list.dept_id;
    this.status = list.status;
};
/*================================== get All Users ================================*/
Users.getAllUsers = (result) => {
    dbConn.query('select U.id,concat(UD.fname," ",UD.mname," ",UD.lname) as name,U.email,U.alt_email,U.dept_id,U.role_id,U.status from tm_user as U ' +
        'join tm_user_detail as UD on UD.user_id = U.id ', (err, res) => {
            if (err) {
                console.log(err)
                result(err);
            } else {
                result(null, res);
            }
        })
}
/*============================ get Users by id ================================*/
Users.getUsersById = (emailID, results) => {
    dbConn.query('select U.id,concat(UD.fname," ",UD.mname," ",UD.lname) as name,U.email,U.password,U.alt_email,U.dept_id,U.role_id,U.status from tm_user as U ' +
        'join tm_user_detail as UD on UD.user_id = U.id where U.email = "' + emailID + '"', (err, res) => {
            if (err) {
                results(err);
            } else {
                results(null, res);
            }
        })
}

/*============================== get Users by Refresh Token =============================*/
Users.getUsersByRefreshToken = (RefreshToken, results) => {
    dbConn.query('select U.id,concat(UD.fname," ",UD.mname," ",UD.lname) as name,U.email,U.password,U.alt_email,U.refresh_token,U.dept_id,U.role_id,U.status from tm_user as U ' +
        'join tm_user_detail as UD on UD.user_id = U.id where U.refresh_token = "' + RefreshToken + '"', (err, res) => {
            if (err) {
                results(err);
            } else {
                results(null, res);
            }
        })
}
/*============================ update Users refresh Token ====================================*/
Users.updateUsersInfo = (id, userReqtData, result) => {
    if (id) {
        var command = 'update  tm_user set refresh_token = ? where id= ?'
        dbConn.query(command,
            [
                userReqtData.refresh_token,
                id
            ], (err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    result(null, res);
                }
            })
    } else {
        console.log(err)
    }

}
/*======================= Create otp ==============================*/
Users.createUserOtp = (UserOtpReqData, result) => {

    var command = 'INSERT INTO tt_user_otp (email,code,expiresIn) VALUES (?,?,?)';
    //var id = uuidv1();
    dbConn.query(command, [
        UserOtpReqData.email,
        UserOtpReqData.code,
        UserOtpReqData.expiresIn],
        (err, res) => {
            if (err) {
                console.log(err)
            } else {
                var otp_id = res.insertId;
                console.log('Last insert ID in users otp', otp_id);
                result(null, otp_id);
            }
        })
};
/*====================== get Users vaild Otp code by id email =====================*/
Users.getUsersOtpCodeByEmail = (emailID, code, results) => {
    dbConn.query('select OT.* from tt_user_otp as OT  where OT.email = "' + emailID + '" and OT.code = "' + code + '"', (err, res) => {
        if (err) {
            results(err);
        } else {
            results(null, res);
        }
    })
}
/*====================== get Users details by email =====================*/
Users.getUsersByEmail = (emailID, results) => {
    dbConn.query('select OT.* from tt_user_otp as OT  where OT.email = "' + emailID + '"', (err, res) => {
        if (err) {
            results(err);
        } else {
            results(null, res);
        }
    })
}
/*================== forgot password =========================*/
Users.forgotPassword = (emailId, userReqtData, result) => {
    if (emailId) {
        var command = 'update  tm_user set password = ? where email= ?'
        dbConn.query(command,
            [
                userReqtData.password,
                emailId
            ], (err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    result(null, res);
                }
            })
    } else {
        console.log(err)
    }

}

module.exports = Users;
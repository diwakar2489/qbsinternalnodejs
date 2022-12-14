var Users = require("../../models/UserModel.js");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var nodemailer = require('nodemailer');
var buffer = require('buffer/').Buffer;

/*=============== Get All forms ============================*/
module.exports.getUser = (req, res) => {
    try {
        const pageSize = 2;
        const page = parseInt(req.query.page);
        Users.countUsers((error1, total) => {
            Users.getUsers(page, pageSize, (error, data) => {
                res.status(200).json({
                    status: true,
                    msg: 'Users message successfully',
                    nbPages: total[0].Total,
                    page: page,
                    limit: pageSize,
                    users: data
                });
            });
        });

    } catch (error) {
        res.status(201).json({ status: false, msg: error })
    }
}
/*=============== Get All forms ============================*/
module.exports.UserLinkList = (req, res) => {
    try {
        const pageSize = 5;
        const page = parseInt(req.query.page);
        Users.countLinksUsers((error1, total) => {
            Users.getLinkUsers(page, pageSize, (error, data) => {
                res.status(200).json({
                    status: true,
                    msg: 'Users Links successfully',
                    nbPages: total[0].Total,
                    page: page,
                    limit: pageSize,
                    users: data
                });
            });
        });

    } catch (error) {
        res.status(201).json({ status: false, msg: error })
    }
}
/*=============== Get IT Assign  List ============================*/
module.exports.getITAssignList = (req, res) => {
    try {
        const pageSize = 2;
        const page = parseInt(req.query.page);
        Users.countItAssignUsers((error1, total) => {
            Users.getItAssignUsers(page, pageSize, (error, data) => {
                res.status(200).json({
                    status: true,
                    msg: 'Users message successfully',
                    nbPages: total[0].Total,
                    page: page,
                    limit: pageSize,
                    users: data
                });
            });
        });

    } catch (error) {
        res.status(201).json({ status: false, msg: error })
    }
}
/*=============== User Login =======================*/
module.exports.Login = async (req, res) => {
    try {
        let emailID = req.body.email;
        const password = req.body.password;
       
        if (emailID != "" && password != "") {
            Users.getUsersLoginEmailId(emailID, async (error, user) => {
               // console.log(user);
                if (user == '') {
                    return res.status(400).json({ status: false, msg: "Invalid Credentials" });
                } else {
                    const match = await bcrypt.compare(password, user[0].password);
                    if (!match)
                        return res.status(400).json({ status: false, msg: "Invalid Credentials !" });

                    const userId = user[0].id;
                    const name = user[0].name;
                    const email = user[0].email;
                    const role_id = user[0].role_id;
                    const dept_id = user[0].dept_id;
                    const accessToken = jwt.sign({ userId, name, email,role_id,dept_id }, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: '1d'
                    });

                    const refreshToken = jwt.sign({ userId, name, email,role_id,dept_id }, process.env.REFRESH_TOKEN_SECRET, {
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
        }else{
            if(emailID == "" && password == ""){
                return res.status(400).json({ status: false, msg: "User Name & password can't be empty" });
            }else if(emailID == ""){
                return res.status(400).json({ status: false, msg: "UserName can't be empty" });
            }else if(password == ""){
                return res.status(400).json({ status: false, msg: "Password can't be empty" });
            }
           
        }
    } catch (error) {
        console.log(error)
        res.status(404).json({ status: false, msg: "Invalid Credentials !" });
    }
}
/*============================ Add Users ======================================*/
module.exports.addUser = async (req, res) => {
    console.log(req.body)
    try {
        const { usertype,empcode, comp, dept, role, reportingMNG, joiningdate, fname, mname, lname, email, status, gender, contact, created_on, created_by } = req.body;
        //     // if (req.files) {
        //     //     let fileName = Date.now() + '_' + req.files.attachment.name;
        //     //     let newPath = path.join(process.cwd(), 'uploads/forms', fileName);
        //     //     req.files.attachment.mv(newPath);
        const password = "Hive123";
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
        var firstRequestData = {
            email: email,
            user_type:usertype,
            password: hashPassword,
            status: status,
            comp_id: comp,
            dept_id: dept,
            role_id: role,
            created_on: created_on,
            created_by: created_by,
        }
        var secondRequestData = {
            emp_code: empcode,
            rept_mng_id: reportingMNG,
            joining_date: joiningdate,
            fname: fname,
            mname: mname,
            lname: lname,
            gender: gender,
            contact_no: contact,
            created_on: created_on,
            created_by: created_by,
        }
        Users.createUsers(firstRequestData, secondRequestData, (error, result) => {
            //console.log(result);
            if (result) {
                res.status(200).json({ status: true, msg: "Users data inserted successfully", data: result });
            } else {
                res.status(201).json({ status: false, msg: "Something Went Wrong" });
            }

        });

    } catch (error) {
        res.status(400).json({ status: false, msg: "Something Went Wrong" });
        console.log(error);
    }
};
/*============================ Add Users ======================================*/
module.exports.UserRemarksUpdate = async (req, res) => {
    console.log(req.body)
    try {
        const { it_status,userId,itremaks,system_allocate, created_on, created_by } = req.body;
        
        var firstRequestData = {
            it_status:it_status,
            updated_on: created_on,
            updated_by: created_by,
        }
        var secondRequestData = {
            user_id: userId,
            system_allocate,
            remarks: itremaks,
            created_on: created_on,
            created_by: created_by,
        }
        Users.createUsersRemarks(userId,firstRequestData, secondRequestData, (error, result) => {
            //console.log(result);
            if (result) {
                res.status(200).json({ status: true, msg: "Users remarks data inserted successfully", data: result });
            } else {
                res.status(201).json({ status: false, msg: "Something Went Wrong" });
            }

        });

    } catch (error) {
        res.status(400).json({ status: false, msg: "Something Went Wrong" });
        console.log(error);
    }
};
/*============================ Add Links Users ======================================*/
module.exports.addLinkUser = async (req, res) => {
    console.log(req.body)
    try {
        const { empcode, company, fname, mname, lname, email, gender, contact, created_on, created_by } = req.body;
    
        var firstRequestData = {
            email: email,
            comp_id: company,
            link_status:1,
            status:0,
            created_on: created_on,
            created_by: created_by,
        }
        var secondRequestData = {
            emp_code: empcode,
            fname: fname,
            mname: mname,
            lname: lname,
            gender: gender,
            contact_no: contact,
            created_on: created_on,
            created_by: created_by,
        }
        Users.createLinkUsers(firstRequestData, secondRequestData, (error, result) => {
            //console.log(result);
            if (result) {

               const base64Email = (buffer.from(email).toString('base64'));
              // console.log(buffer.from("SGVsbG8gVmlzaGFsIFRoYWt1cg==", 'base64').toString('ascii'));
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
                    subject: 'Complete Profile',
                    html: `<h1>Welcome</h1><p>That was easy!</p><p>Please Complate your profile</p><br /> <a href="http://localhost:3000/user-joining-form?user=${base64Email}">Click here to Register</a>`,
                };
    
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                res.status(200).json({ status: true, msg: "Users data inserted successfully", data: result });
            } else {
                res.status(201).json({ status: false, msg: "Something Went Wrong" });
            }

        });

    } catch (error) {
        res.status(400).json({ status: false, msg: "Something Went Wrong" });
        console.log(error);
    }
};
/*================================= Email links Verify By User Eamil ==================================*/
module.exports.UserLinkVerify = async (req, res) => {
    try {
        let EamilID = req.body.email;
        //let EamilID = 'ZGl3YWthci5wYW5kZXlAcWJzbGVhcm5pbmcuY29t';
        const decodeEmailID = (buffer.from(EamilID, 'base64').toString('ascii'));
        console.log(EamilID)
        console.log(decodeEmailID)
        Users.getUsersByEmailId(decodeEmailID, (error, data) => {
            console.log(data);
            if (data != '') {
                res.status(200).json({ status: true, msg: "Users Link Verify successfully", result: data[0] });
            } else {
                res.status(201).json({ status: false, msg: "Users Link Verify ID not founds !" });

            }
        });
    } catch (e) {
        res.status(204).json({ status: false, msg: "Users Link Verify ID not founds !" });
    }
};
module.exports.UserLinksDetailsUpdate = async (req, res) => {
     console.log(req.body);
     try {
        let Email = req.body.email;
        let segment = req.body.segment
        const decodeEmailID = (buffer.from(segment, 'base64').toString('ascii'));
        if(decodeEmailID === Email){
            const { userid,
            salutation, 
            fname,
            mname,
            lname, 
            guardian, 
            nationality, 
            dob, 
            do_wann, 
            bloodgroup,
            adharnumber,
            pannumber,
            gender,
            marrigestatus,
            abled,
            currentadd1,
            currentadd2,
            currentpin,
            currentpersonalnumber,
            currenthomenumber,
            permanentadd1,
            permanentadd2,
            permanentpin,
            permanentpersonalnumber,
            emr_name,
            emr_relation,
            emr_phone,
            updated_on } = req.body;
            var firstRequestData = {
                link_status:0,
                updated_on: updated_on,
                updated_by: userid,
            }
            var secondRequestData = {
                salutation:salutation,
                fname: fname,
                mname: mname,
                lname: lname,
                gender: gender,
                guardian_name: guardian,
                nationality_type:nationality,
                birthday:dob,
                wedding_day:do_wann,
                blood_group:bloodgroup,
                uid_no:adharnumber,
                pan_no:pannumber,
                marrige_status:marrigestatus,
                disability_type:abled,
                updated_on: updated_on,
                updated_by: userid,
            }
            var thirdRequestData = {
                user_id:userid,
                current_add_one:currentadd1,
                current_add_two:currentadd2,
                current_pin:currentpin,
                current_per_no:currentpersonalnumber,
                current_home_no:currenthomenumber,
                permanent_add_one:permanentadd1,
                permanent_add_two:permanentadd2,
                permanent_pin:permanentpin,
                permanent_per_no:permanentpersonalnumber,
                emergency_name:emr_name,
                emergency_relation:emr_relation,
                emergency_phone:emr_phone,
                created_by:userid,
                created_on:updated_on
            }
            Users.updateUsersLinksDetailsInfo(userid, firstRequestData, secondRequestData,thirdRequestData, (error, data) => {
                console.log(data);
                if (data.affectedRows > 0) {

                    res.status(200).json({ status: true, msg: 'Update Users Links profile successfully', result: data });
                } else {
                    res.status(201).json({ status: false, msg: 'Error for Update Users Links profile Id=' + userid });
                }
            });
        }else{
            console.log('errors')
        }
    //     res.status(200).json({ status: true, msg: 'Update Users message successfully', result: data });

       


    } catch (e) {
        res.status(204).json({ status: false, msg: 'Something went wrong!.' });

    }
};
/*================================= Edit Users By id ==================================*/
module.exports.editUsers = async (req, res) => {
    try {
        let ID = req.body.id;
        console.log(ID)
        Users.getUsersById(ID, (error, data) => {
            console.log(data);
            if (data != '') {
                res.status(200).json({ status: true, msg: "Users Message Data fatch successfully", result: data[0] });
            } else {
                res.status(201).json({ status: false, msg: "Users Message ID not founds !" });

            }
        });
    } catch (e) {
        res.status(204).json({ status: false, msg: "Users message ID not founds !" });
    }
};
/*======================================  updated User details ==================================================*/
module.exports.UserDetailsUpdate = async (req, res) => {
    // console.log(req.files);
    try {
        let ID = req.body.id;

        const { usertype,comp, dept, role,location, reportingMNG, joiningdate, fname, mname, lname, status, gender, contact, updated_on, updated_by } = req.body;

        var firstRequestData = {
            status: status,
            user_type:usertype,
            comp_id: comp,
            dept_id: dept,
            role_id: role,
            updated_on: updated_on,
            updated_by: updated_by,
        }
        var secondRequestData = {
            rept_mng_id: reportingMNG,
            joining_date: joiningdate,
            location:location,
            fname: fname,
            mname: mname,
            lname: lname,
            gender: gender,
            contact_no: contact,
            updated_on: updated_on,
            updated_by: updated_by,
        }
        Users.updateUsersDetailsInfo(ID, firstRequestData, secondRequestData, (error, data) => {
            console.log(data);
            if (data.affectedRows > 0) {

                res.status(200).json({ status: true, msg: 'Update Users message successfully', result: data });
            } else {
                res.status(201).json({ status: false, msg: 'Error for Update Users message Id=' + ID });
            }
        });


    } catch (e) {
        res.status(204).json({ status: false, msg: 'Something went wrong!.' });

    }
};
/*=============== User Forgot password ============================*/
module.exports.ForgotPass = async (req, res) => {
    const { email } = req.body;
    Users.getUsersByEmailId(email, (err, result) => {
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

    const refreshToken = req.cookies.refreshToken || req.params.token;
    //console.log(refreshToken);return false
    if (!refreshToken) return res.status(204).json({ status: false, msg: 'refresh Token missing' });
    Users.getUsersByRefreshToken(refreshToken, (error, UserInfo) => {

        if (!UserInfo) return res.status(204).json({ status: false, msg: 'User not here' });
        const userId = UserInfo[0].id;
        Users.updateUsersInfo(userId, { refresh_token: null }, (error, UserInfo) => {

            res.clearCookie('refreshToken');
            return res.status(200).json({ status: true, msg: 'logout successfully' });
        });
    });

}

var dbConn = require("../config/mysql_connection.js");
var Users = function (list) {
    this.id = list.id;
    this.email = list.email;
    this.dept = list.dept_id;
    this.status = list.status;
};
/*================================== get All Users ================================*/
Users.getUsers = (pagees, pageSize,result) => {
    let page = pagees ? Number(pagees) : 1;
    const startingLimit = (page - 1) * pageSize;
    dbConn.query('select U.id,concat(UD.fname," ",UD.mname," ",UD.lname) as name,UD.it_status,U.email,U.dept_id,U.role_id,U.user_type,U.link_status as link,U.status,Cm.name as company,D.name as dept_name,R.name as role_name from tm_user as U ' +
        'join tm_user_detail as UD on UD.user_id = U.id '+
        'left join tm_company as Cm on Cm.id = U.comp_id '+
        'left join tm_department as D on D.id = U.dept_id ' +
        'left join tm_role as R on R.id = U.role_id where U.link_status = 0 ORDER BY U.id desc limit ' + startingLimit + ',' + pageSize, (err, res) => {
            if (err) {
                console.log(err)
                result(err);
            } else {
                result(null, res);
            }
        })
}
/*================================== get All Link Users ================================*/
Users.getLinkUsers = (pagees, pageSize,result) => {
    let page = pagees ? Number(pagees) : 1;
    const startingLimit = (page - 1) * pageSize;
    dbConn.query('select U.id,concat(UD.fname," ",UD.mname," ",UD.lname) as name,U.email,U.link_status as link,U.status,Cm.name as company,D.name as dept_name,R.name as role_name from tm_user as U ' +
        'join tm_user_detail as UD on UD.user_id = U.id '+
        'left join tm_company as Cm on Cm.id = U.comp_id '+
        'left join tm_department as D on D.id = U.dept_id ' +
        'left join tm_role as R on R.id = U.role_id where U.link_status = 1 ORDER BY U.id desc limit ' + startingLimit + ',' + pageSize, (err, res) => {
            if (err) {
                console.log(err)
                result(err);
            } else {
                result(null, res);
            }
        })
}
/*================================== get It Assign Users ================================*/
Users.getItAssignUsers = (pagees, pageSize,result) => {
    let page = pagees ? Number(pagees) : 1;
    const startingLimit = (page - 1) * pageSize;
    dbConn.query('select DISTINCT U.id,concat(UD.fname," ",UD.mname," ",UD.lname) as name,UD.emp_code as emp_id,UD.joining_date as doj,UD.contact_no as mobile,UD.location,U.email,Cm.name as company,D.name as dept_name,R.name as role_name from tm_user as U ' +
        'join tm_user_detail as UD on UD.user_id = U.id '+
        'left join tm_company as Cm on Cm.id = U.comp_id '+
        'left join tm_department as D on D.id = U.dept_id ' +
        'left join tm_user_remarks as UR on UR.user_id = U.id ' +
        'left join tm_role as R on R.id = U.role_id ORDER BY U.id desc limit ' + startingLimit + ',' + pageSize, (err, res) => {
            if (err) {
                console.log(err)
                result(err);
            } else {
                result(null, res);
            }
        })
}
/*================================== get All Users ================================*/
Users.countItAssignUsers = (result) => {
    dbConn.query('select DISTINCT COUNT(U.id) as Total from tm_user as U ' +
        'join tm_user_remarks as UR on UR.user_id = U.id ', (err, res) => {
            if (err) {
                console.log(err)
                result(err);
            } else {
                result(null, res);
            }
        })
}
/*================================== get All Users ================================*/
Users.countLinksUsers = (result) => {
    dbConn.query('select COUNT(U.id) as Total from tm_user as U ' +
        'join tm_user_detail as UD on UD.user_id = U.id where U.link_status = 1 ', (err, res) => {
            if (err) {
                console.log(err)
                result(err);
            } else {
                result(null, res);
            }
        })
}
/*================================== get All Users ================================*/
Users.countUsers = (result) => {
    dbConn.query('select COUNT(U.id) as Total from tm_user as U ' +
        'join tm_user_detail as UD on UD.user_id = U.id where U.link_status = 0 ', (err, res) => {
            if (err) {
                console.log(err)
                result(err);
            } else {
                result(null, res);
            }
        })
}
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
Users.getUsersById = (ID, results) => {
    dbConn.query('select U.id,U.email,U.user_type,U.alt_email,C.name as company,D.name as dept_name,R.name as role_name,U.comp_id,U.dept_id,U.role_id,U.status,UD.* from tm_user as U ' +    
    'join tm_user_detail as UD on UD.user_id = U.id '+
    'left join tm_company as C on C.id = U.comp_id ' +
    'left join tm_department as D on D.id = U.dept_id ' +
    'left join tm_role as R on R.id = U.role_id  where U.id = "' + ID + '"', (err, res) => {
            if (err) {
                results(err);
            } else {
                results(null, res);
            }
        })
}

/*============================ get Users Login email ================================*/
Users.getUsersLoginEmailId = (emailID, results) => {
    dbConn.query('select U.id,concat(UD.fname," ",UD.mname," ",UD.lname) as name,U.user_type,U.email,U.password,U.alt_email,U.dept_id,U.role_id,U.status from tm_user as U ' +
        'join tm_user_detail as UD on UD.user_id = U.id where U.email = "' + emailID + '"', (err, res) => {
            if (err) {
                results(err);
            } else {
                results(null, res);
            }
        })
}
/*============================ get Users by email ================================*/
Users.getUsersByEmailId = (emailID, results) => {
    dbConn.query('select U.id,U.email,UD.fname,UD.mname,UD.lname from tm_user as U ' +
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
/*======================= Create User ==============================*/
Users.createUsers = (requestDataOne,requestDataTwo, result) => {

    var command = 'INSERT INTO tm_user (user_type,email,password,comp_id,dept_id,role_id,status,created_on,created_by) VALUES (?,?,?,?,?,?,?,?,?)';
    //var id = uuidv1();
    dbConn.query(command, [
        requestDataOne.user_type,
        requestDataOne.email,
        requestDataOne.password,
        requestDataOne.comp_id,
        requestDataOne.dept_id,
        requestDataOne.role_id,
        requestDataOne.status,
        requestDataOne.created_on,
        requestDataOne.created_by],
        (err, res) => {
            if (err) {
                console.log(err)
            } else {
                var user_id = res.insertId;
               // console.log('Last insert ID', user_id);
                var command2 = 'INSERT INTO tm_user_detail (user_id, emp_code,rept_mng_id,joining_date,fname,mname,lname,gender,contact_no,created_on,created_by) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
                dbConn.query(command2, [
                        user_id,
                        requestDataTwo.emp_code,
                        requestDataTwo.rept_mng_id,
                        requestDataTwo.joining_date,
                        requestDataTwo.fname,
                        requestDataTwo.mname,
                        requestDataTwo.lname,
                        requestDataTwo.gender,
                        requestDataTwo.contact_no,
                        requestDataTwo.created_on,
                        requestDataTwo.created_by], (err, res) => {
                        if (err) throw err;
                });
                result(null, user_id);
            }
        })
};
/*======================= Create User Remarks ==============================*/
Users.createUsersRemarks = (id,requestDataOne,requestDataTwo, result) => {
    if(id){
    var command = 'update  tm_user_detail set it_status = ?,updated_on=?,updated_by=? where user_id= ?'
        dbConn.query(command,
            [
                requestDataOne.it_status,
                requestDataOne.updated_on,
                requestDataOne.updated_by,
                id
            ], (err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    var command2 = 'INSERT INTO tm_user_remarks (user_id, remarks,system_allocate,created_on,created_by) VALUES (?,?,?,?,?)';
                dbConn.query(command2, [
                        requestDataTwo.user_id,
                        requestDataTwo.remarks,
                        requestDataTwo.system_allocate,
                        requestDataTwo.created_on,
                        requestDataTwo.created_by], (err, resinsert) => {
                        if (err) throw err;
                });
                    result(null, res);
                }
            })
    
    }else{
        console.log(err)
    }
};
/*======================= Create Links User ==============================*/
Users.createLinkUsers = (requestDataOne,requestDataTwo, result) => {

    var command = 'INSERT INTO tm_user (email,comp_id,link_status,status,created_on,created_by) VALUES (?,?,?,?,?,?)';
    //var id = uuidv1();
    dbConn.query(command, [
        requestDataOne.email,
        requestDataOne.comp_id,
        requestDataOne.link_status,
        requestDataOne.status,
        requestDataOne.created_on,
        requestDataOne.created_by],
        (err, res) => {
            if (err) {
                console.log(err)
            } else {
                var user_id = res.insertId;
               // console.log('Last insert ID', user_id);
                var command2 = 'INSERT INTO tm_user_detail (user_id, emp_code,fname,mname,lname,gender,contact_no,created_on,created_by) VALUES (?,?,?,?,?,?,?,?,?)';
                dbConn.query(command2, [
                        user_id,
                        requestDataTwo.emp_code,
                        requestDataTwo.fname,
                        requestDataTwo.mname,
                        requestDataTwo.lname,
                        requestDataTwo.gender,
                        requestDataTwo.contact_no,
                        requestDataTwo.created_on,
                        requestDataTwo.created_by], (err, res) => {
                        if (err) throw err;
                });
                result(null, user_id);
            }
        })
};
/*======================= Update Users details ==============================*/
Users.updateUsersDetailsInfo = (id,requestDataOne,requestDataTwo, result) => {
    var command = 'update tm_user set comp_id =?,user_type=?,dept_id = ?,role_id = ?,status = ?,updated_on = ?,updated_by = ? where id= ?'
   // var command = 'INSERT INTO tm_user (email,password,comp_id,dept_id,role_id,status,updated_on,updated_by) VALUES (?,?,?,?,?,?,?,?)';
    //var id = uuidv1();
    dbConn.query(command, [
        requestDataOne.comp_id,
        requestDataOne.user_type,
        requestDataOne.dept_id,
        requestDataOne.role_id,
        requestDataOne.status,
        requestDataOne.created_on,
        requestDataOne.created_by,
        id ],
        (err, res) => {
            if (err) {
                console.log(err)
            } else {
               var command2 = 'update tm_user_detail set location=?,rept_mng_id=?,joining_date=?,fname=?,mname=?,lname=?,gender=?,contact_no=?,updated_on = ?,updated_by = ? where user_id= ?'
               // var command2 = 'INSERT INTO tm_user_detail (user_id, emp_code,rept_mng_id,joining_date,fname,mname,lname,gender,contact_no,created_on,created_by) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
                dbConn.query(command2, [
                        requestDataTwo.location,
                        requestDataTwo.rept_mng_id,
                        requestDataTwo.joining_date,
                        requestDataTwo.fname,
                        requestDataTwo.mname,
                        requestDataTwo.lname,
                        requestDataTwo.gender,
                        requestDataTwo.contact_no,
                        requestDataTwo.updated_on,
                        requestDataTwo.updated_by,
                        id], (err, res) => {
                        if (err) throw err;
                });
                result(null, res);
            }
        })
};
/*======================= Update Users details ==============================*/
Users.updateUsersLinksDetailsInfo = (id,requestDataOne,requestDataTwo,requestDataThird, result) => {
    var command = 'update tm_user set link_status =?,updated_on = ?,updated_by = ? where id= ?'

    dbConn.query(command, [
        requestDataOne.link_status,
        requestDataOne.created_on,
        requestDataOne.created_by,
        id ],
        (err, res) => {
            if (err) {
                console.log(err)
            } else {
                
               var command2 = 'update tm_user_detail set salutation=?,fname=?,mname=?,lname=?,gender=?,guardian_name=?,nationality_type=?,birthday=?,wedding_day=?,blood_group=?,uid_no=?,pan_no=?,marrige_status=?,disability_type=?,updated_on = ?,updated_by = ? where user_id= ?'
                dbConn.query(command2, [
                        requestDataTwo.salutation,
                        requestDataTwo.fname,
                        requestDataTwo.mname,
                        requestDataTwo.lname,
                        requestDataTwo.gender,
                        requestDataTwo.guardian_name,
                        requestDataTwo.nationality_type,
                        requestDataTwo.birthday,
                        requestDataTwo.wedding_day,
                        requestDataTwo.blood_group,
                        requestDataTwo.uid_no,
                        requestDataTwo.pan_no,
                        requestDataTwo.marrige_status,
                        requestDataTwo.disability_type,
                        requestDataTwo.updated_on,
                        requestDataTwo.updated_by,
                        id], (err, res) => {
                        if (err) {
                            console.log('user details update error '+err)
                        }else{
                            var command3 = 'INSERT INTO tm_user_address (user_id, current_add_one,current_add_two,current_pin,current_per_no,current_home_no,permanent_add_one,permanent_add_two,permanent_pin,permanent_per_no,emergency_name,emergency_relation,emergency_phone,created_on,created_by) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
                            dbConn.query(command3, [
                                    requestDataThird.user_id,
                                    requestDataThird.current_add_one,
                                    requestDataThird.current_add_two,
                                    requestDataThird.current_pin,
                                    requestDataThird.current_per_no,
                                    requestDataThird.current_home_no,
                                    requestDataThird.permanent_add_one,
                                    requestDataThird.permanent_add_two,
                                    requestDataThird.permanent_pin,
                                    requestDataThird.permanent_per_no,
                                    requestDataThird.emergency_name,
                                    requestDataThird.emergency_relation,
                                    requestDataThird.emergency_phone,
                                    requestDataThird.created_on,
                                    requestDataThird.created_by], (err, ress) => {
                                    if (err) throw err;
                                   // result(null, ress);
                            });
                            
                        }
                });
                result(null, res);
            }
        })
};
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
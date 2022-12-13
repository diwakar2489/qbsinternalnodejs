var dbConn = require("../config/mysql_connection.js");
var Directorys = function (list) {
    this.id = list.id;
    this.email = list.email;
    this.status = list.status;
};
/*=============== Get Search All Directory ============================*/
Directorys.getAllSearchDirectory = (search, pagees, pageSize,result) => {
    let page = pagees ? Number(pagees) : 1;
    const startingLimit = (page - 1) * pageSize;
    dbConn.query('select U.id,U.email,U.status,concat(UD.fname," ",UD.mname," ",UD.lname) as name,D.name as dept_name from tm_user as U ' +
    'left join tm_user_detail as UD on UD.user_id = U.id '+
    'left join tm_department as D on D.id = U.dept_id '+
    ' where UD.fname LIKE "%' + search + '%" ORDER BY U.id desc limit ' + startingLimit + ',' + pageSize, (err, res) => {
        if (err) {
            console.log(err)
            result(err);
        } else {
            result(null, res);
        }
    })
}
/*======================== get All count Directory ===========================*/
Directorys.countDirectoryMessages = (result) => {
    dbConn.query('select COUNT(U.id) as Total from tm_user as U ', (err, res) => {
        if (err) {
            console.log(err)
            result(err);
        } else {
            result(null, res);
        }
    })
}
module.exports = Directorys;
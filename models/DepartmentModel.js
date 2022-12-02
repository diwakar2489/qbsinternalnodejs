var dbConn = require("../config/mysql_connection.js");
var Departments = function (list) {
    this.id = list.id;
    this.name = list.name;
    this.status = list.status;
};
/*=============== Get All Department ============================*/
Departments.getAllDepartment = (result) => {
    dbConn.query('select C.* from tm_department as C ', (err, res) => {
        if (err) {
            console.log(err)
            result(err);
        } else {
            result(null, res);
        }
    })
}
module.exports = Departments;
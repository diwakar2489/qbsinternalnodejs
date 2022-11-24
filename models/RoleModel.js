var dbConn = require("../config/mysql_connection.js");
var Roles = function (list) {
    this.id = list.id;
    this.name = list.name;
    this.status = list.status;
};
//get All Roles
Roles.getAllRolesById = (ID, result) => {
    dbConn.query('select R.* from tm_role as R where R.dept_id =' + ID, (err, res) => {
        if (err) {
            console.log(err)
            result(err);
        } else {
            result(null, res);
        }
    })
}
module.exports = Roles;
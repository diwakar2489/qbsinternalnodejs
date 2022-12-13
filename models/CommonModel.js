var dbConn = require("../config/mysql_connection.js");
var Commons = function (list) {
    this.id = list.id;
    this.name = list.name;
    this.status = list.status;
};
/*=============== Get All Common files ============================*/
Commons.getAllCommonFiles = (result) => {
    dbConn.query('select F.* from tm_forms as F ', (err, res) => {
        if (err) {
            console.log(err)
            result(err);
        } else {
            result(null, res);
        }
    })
}
module.exports = Commons;
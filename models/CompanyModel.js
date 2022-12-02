var dbConn = require("../config/mysql_connection.js");
var Companys = function (list) {
    this.id = list.id;
    this.name = list.name;
    this.status = list.status;
};
/*=============== Get All Companys ============================*/
Companys.getAllCompany = (result) => {
    dbConn.query('select C.* from tm_company as C ', (err, res) => {
        if (err) {
            console.log(err)
            result(err);
        } else {
            result(null, res);
        }
    })
}
module.exports = Companys;
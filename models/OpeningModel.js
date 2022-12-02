var dbConn = require("../config/mysql_connection.js");
var Openings = function (list) {
    this.id = list.id;
    this.dept_id = list.dept_id;
    this.role_id = list.role_id;
    this.opening_limit = list.opening_limit;
    this.name = list.name;
    this.description = list.description;
    this.status = list.status;
};
/*========================== Get All Openings ========================*/
Openings.getAllOpenings = (pagees, pageSize, total, result) => {
    const numOfResults = total;
    const numberOfPages = Math.ceil(numOfResults / pageSize);
    let page = pagees ? Number(pagees) : 1;
    const startingLimit = (page - 1) * pageSize;
    dbConn.query('select O.id,O.opening_limit,O.experience,O.status,O.name as openingName,C.name as CompName,D.name as DeptName,R.name as RoleName from tm_opening as O ' +
        'left join tm_company as C on C.id = O.comp_id ' +
        'left join tm_department as D on D.id = O.dept_id ' +
        'left join tm_role as R on R.id = O.role_id ORDER BY O.id desc limit ' + startingLimit + ',' + pageSize, (err, res) => {
            if (err) {
                console.log(err)
                result(err);
            } else {
                result(null, res);
            }
        })
}
/*======================== get All count Openings ===========================*/
Openings.countOpenings = (result) => {
    dbConn.query('select COUNT(O.id) as Total from tm_opening as O ', (err, res) => {
        if (err) {
            console.log(err)
            result(err);
        } else {
            result(null, res);
        }
    })
}
/*================================ Get Opening by id ========================================*/
Openings.getOpeningsById = (ID, result) => {
    dbConn.query('select O.* from tm_opening as O where O.id ="' + ID + '"', (err, res) => {
        if (err) {
            console.log(err)
            result(err);
        } else {
            result(null, res);
        }
    })
}
/*=========================== Add Opening Data ===========================*/
Openings.createOpeningInfo = (openingReqData, result) => {

    var command = 'INSERT INTO tm_opening (comp_id,dept_id,role_id,opening_limit,name,description,experience,created_on,created_by,status) VALUES (?,?,?,?,?,?,?,?,?,?)';
    //var id = uuidv1();
    dbConn.query(command, [
        openingReqData.comp_id,
        openingReqData.dept_id,
        openingReqData.role_id,
        openingReqData.opening_limit,
        openingReqData.name,
        openingReqData.description,
        openingReqData.experience,
        openingReqData.created_on,
        openingReqData.created_by,
        openingReqData.status
    ],
        (err, res) => {
            if (err) {
                console.log(err)
            } else {
                var opening_id = res.insertId;
                console.log('Last insert ID in opening', opening_id);
                result(null, opening_id);
            }
        })
};
/*=========================== Update Opening Data ===========================*/
Openings.updateOpeningInfo = (id, userReqtData, result) => {
    if (id) {
        var command = 'update tm_opening set comp_id = ?,dept_id =?,role_id = ?,opening_limit = ?,name = ?, description = ?,experience = ?,updated_on = ?,updated_by = ?,status = ? where id= ?'
        dbConn.query(command,
            [
                userReqtData.comp_id,
                userReqtData.dept_id,
                userReqtData.role_id,
                userReqtData.opening_limit,
                userReqtData.name,
                userReqtData.description,
                userReqtData.experience,
                userReqtData.updated_on,
                userReqtData.updated_by,
                userReqtData.status,
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
module.exports = Openings;
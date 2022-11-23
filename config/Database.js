import {Sequelize} from "sequelize";

const db = new Sequelize('intranet','root','',{
    host: "localhost",
    dialect: "mysql"
});

export default db;
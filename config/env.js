module.exports = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USERNAME,
    PASSWORD: '',
    DB: process.env.DB_DATABASE,
    dialect: "mysql",
    // define: {
    //     timestamps: true,
    //     freezeTableName: true
    //   },
    // pool: {
    //     max: 10,
    //     min: 0,
    //     acquire: 30000,
    //     idle: 10000
    // }
};
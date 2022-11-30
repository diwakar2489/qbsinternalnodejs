var express = require("express");
var bodyParser = require('body-parser');

var cookieParser = require("cookie-parser");
var cors = require("cors");

require('dotenv').config();

// console.log(process.env.DB_HOST); 
// console.log(process.env.DB_DATABASE); 
// console.log(process.env.PORT); 

const app = express();

var Authrouter = require("./routes/index.js");


app.use(cors({credentials:true, origin:'http://localhost:3000' }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/api',Authrouter);

app.listen(8082, ()=> console.log('Server running at port 8082'));
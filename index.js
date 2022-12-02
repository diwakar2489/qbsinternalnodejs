var express = require("express");
//var dotenv = require("dotenv");
var cookieParser = require("cookie-parser");
var cors = require("cors");

require('dotenv').config();

const app = express();

var Authrouter = require("./routes/index.js");


app.use(cors({credentials:true, origin:'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api',Authrouter);

app.listen(8082, ()=> console.log('Server running at port 8082'));
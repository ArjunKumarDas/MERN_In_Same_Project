const express = require('express');
const router = require('./src/routes/api');
const app = new express();
const bodyParser = require('body-parser');



//Security Middlaware
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitise = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');


// DataBase 
const mongoose = require('mongoose');
const { path } = require('express/lib/application');


// Security MiddlaWare Implement
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(xss());
app.use(mongoSanitise());

// BodyParser
app.use(bodyParser.json());

// RateLimiter

const limiter = rateLimit({window:15*60*100, max:3000})

// DataBase
// Managing Front End Routing
app.use(express.static('client-side/build'))
app.get("*", function(req,res){
  req.sendFile(path.resolve(__dirname,'client-side','build','index.html'))
})

// Managing Back End Routing
app.use("/api/v1", router);

module.exports=app;


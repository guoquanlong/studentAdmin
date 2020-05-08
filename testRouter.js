const express = require('express');
const router = require('./route');
const studentRouter = require('./lianxi/studentRouter.js');

var app = express();
// console.log(router);
//处理路由: 当我请求http://localhost:3000/shouye
app.use('/login',router);

app.use('/student',studentRouter);

app.listen(3000);
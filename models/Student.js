const mongoose = require('mongoose');

//1.声明schema
let studentSchema = new mongoose.Schema({
    sid : Number,//        学号
    name : String,//       姓名
    sex : String,//        性别
    age : Number,//        年龄
})

//2.初始化Student类 该类会声明一个名为students的集合
let Student = mongoose.model('Student',studentSchema);

//3.导出集合
module.exports = Student;
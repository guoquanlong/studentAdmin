const mongoose = require('mongoose'),
    md5 = require('md5-node');

//1.声明schema
let adminSchema = new mongoose.Schema({
    username : String,//          用户名
    password : String,//          密码
    posttime : Number,//          注册时间
    lastLoginTime : Number//      最后一次登录时间
})
//验证用户名是否存在
adminSchema.statics.checkUser = function (user,callbask){
    this.find({'username':user},(err,results)=>{
        if( err ){
            callbask({t:false,val:null});
            return;
        }
        if( results.length !=0 ){
            callbask({t:true,val:results[0]});
            return;
        }
        callbask({t:false,val:null});
    });
}
//处理登录:
adminSchema.statics.checkLogin = function(json,callbask){
    this.checkUser(json.username,function (torf){
        //{username:xxxx,password:1232sdasddsa,posttime:21312,lastLoginTime:21312}
        if( torf.t ){//用户名对了   
            if( md5(json.password) == torf.val.password ){
                callbask(1); //登录成功
                //实例调用的方法是动态方法
                torf.val.changelastLoginTime()
                return;
            }
            callbask(-1);//密码输入错误
        }else{
            callbask(-2);//用户名不存在
        }
    })
}
//修改用户登录成功以后的登录时间
adminSchema.methods.changelastLoginTime = function(){
    var timeStemp = new Date().getTime();
    this.lastLoginTime = timeStemp;
    this.save();
}


//2.初始化Admin类 该类会声明一个名为admins的集合
let Admin = mongoose.model('Admin',adminSchema);

//3.导出集合
module.exports = Admin;
const formidable = require('formidable'),
    Admin = require('../models/Admin');
/*登录块 */
//渲染登录页:
exports.showLogin = function (req,res){
    if( req.session['s_id'] ){ //如果已经登录过就不需要访问登录页面了
        res.redirect('/');
        return;
    }
    //设置了ejs模板引擎 通过render渲染login时他就会自动到views目录下寻找名为login.ejs的模版文件进行渲染
    res.render('login');
}
// 处理登录
exports.doLogin = function (req,res){
    let form = formidable();
    form.parse(req,(err,fields)=>{
        Admin.checkLogin(fields,function(data){
            console.log(data);
            if( data == 1 ){ //如果登录成功 种session
                req.session['s_id'] = fields.username;
                //把登录的管理员的最后一次登录时间改掉
            }
            res.send(`${data}`);
        });
    })
}
//验证用户是否存在
exports.checkUser  = function (req,res){
    let form = formidable();
    form.parse(req,(err,fields)=>{
        if(err){
            res.json({result : false});
            return;
        }
        console.log(fields.username);
        Admin.checkUser(fields.username,function (val){
            // console.log(val);
            res.json({result:val.t});
        });
    })
}
/* 登录块 --end--  */

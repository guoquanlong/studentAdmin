//处理路由的文件:
const express = require('express'),
    {
        showLogin,
        doLogin,
        checkUser
    } = require('../controllers/loginctrl'),
    {logout} = require('../controllers/Logout'),
    {
        showIndex: sI,
        showList: sL,
        searchStudent: sS,
        exportStudentToExcel: eSTE,
        showAddStudent: sAS,
        addStudent: aS,
        updateStudent: uS,
        deleteStudent: dS
    } = require('../controllers/studentCtrl');

//生成路由:
let router = express.Router();

//登录验证: 验证如果没有登陆过不能访问管理界面的任何内容
router.use((req,res,next)=>{
    if( !req.session['s_id'] && req.url !='/login' ){ //没有session 证明没有登录过
        console.log(1);
        res.send('/login');
        return;
    }
    next(); //有登录正常走下面的请求
})

//路由清单:  
router.get('/login',showLogin); //访问登录页面 渲染登录ejs文件
router.post('/login',doLogin); //访问登录接口,处理登录操作
router.propfind('/login',checkUser); //访问接口 验证用户名是否存在

//验证用户名是否存在
router.get('/',sI); //访问首页
router.get('/student/msg',sL);//访问接口  处理学生数据
router.get('/student/search',sS);// 访问接口  处理搜索学生
router.get('/student/exportExcel',eSTE);//访问接口 处理学生数据导出
router.get('/student/addStudent',sAS);//访问增加学生页面
router.put('/student/addStudent',aS);//访问接口 处理增加学生
router.post('/student/:sid',uS);//访问接口 处理修改学生数据
router.delete('/student/:sid',dS);//访问接口 处理删除学生

//退出
router.get('/Logout',logout);//访问接口 处理退出

//导出路由
module.exports = router;
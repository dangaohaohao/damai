const express = require('express');
const mongoose = require('mongoose')

const server = express();

server.use(express.urlencoded({
    urlencoded: false
}));
server.use(express.json());

//设置跨域访问
server.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});



server.use('/api/user', require('./routers/userRouter'));
// 连接数据库
mongoose.connect('mongodb://localhost:27017/db', {
    useNewUrlParser: true
}, (error) => {
    if (error) {
        console.log('连接数据库失败：');
        console.log(error);
    } else {
        console.log('连接数据成功');
        // 启动成功
        server.listen('9000', (error) => {
            if (!error) {
                console.log('服务器启动成功');
            } else {
                console.log('服务器启动失败：');
                console.log(error);
            }
        })
    }
})
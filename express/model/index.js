const mongoose = require('mongoose');

// 连接MongoDB 数据库
mongoose.connect('mongodb://localhost:27017/MonitorSDK',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// 建立数据库连接
const db = mongoose.connection

// 当连接失败的时候
db.on('error', err => {
    console.log('连接失败')
})

// 当连接成功的时候
db.once('open', () => {
    console.log('MongoDB 数据库连接成功')
})

// 组织导出模型类
module.exports = {
    Test: mongoose.model('test',require('./test')),
    Error: mongoose.model('errorMes',require('./errorMes')),
    Experience: mongoose.model('userExp',require('./userExp')),
    Statistics: mongoose.model('userSta',require('./userSta')),
    Api: mongoose.model('Api',require('./api'))
}
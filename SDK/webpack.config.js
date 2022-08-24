const path = require('path');
// HtmlWebpackPlugin 生成产出的HTML文件 user-agent 把浏览器的UserAgent变成一个对象
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/index.js', //入口文件
    context: process.cwd(), //上下文目录 
    mode: 'development', //开发模式
    output: {
        path: path.resolve(__dirname,'dist'), //输出目录
        filename: 'monitor.js' //文件名
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        }, //devServer静态文件根目录
        compress: true,
        port: 9000,
        setupMiddlewares: (middlewares, devServer) => {
            if (!devServer) {
              throw new Error('webpack-dev-server is not defined');
            }
      
            devServer.app.get('/success', (req, res) => {
              res.json({ id: 1 })
            });

            devServer.app.post('/error', (req, res) => {
                res.json({ error: '500' })
                res.sendStatus(500)
            });
      
            // 如果你想在所有其他中间件之前运行一个中间件或者当你从 `onBeforeSetupMiddleware` 配置项迁移时，
            // 可以使用 `unshift` 方法
            middlewares.unshift({
              name: 'fist-in-array',
              // `path` 是可选的
              path: '/foo/path',
              middleware: (req, res) => {
                res.send('Foo!');
              },
            });
      
            // 如果你想在所有其他中间件之后运行一个中间件或者当你从 `onAfterSetupMiddleware` 配置项迁移时，
            // 可以使用 `push` 方法
            middlewares.push({
              name: 'hello-world-test-one',
              // `path` 是可选的
              path: '/foo/bar',
              middleware: (req, res) => {
                res.send('Foo Bar!');
              },
            });
      
            // middlewares.push((req, res) => {
            //   res.send('Hello World!');
            // });
      
            return middlewares;
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'head'
        })
    ]
}
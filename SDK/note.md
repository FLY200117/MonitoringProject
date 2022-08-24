# SDK整体思路

## Webpack配置

Webpack相关的配置以及相关的插件

+ webpack
+ webpack-cli
+ webpack-dev-server
+ user-agent
+ html-webpack-plugin

相关功能可以在webpack.config.js文件中查看

## monitor设计

monitor中的文件入口index注意要在项目的文件入口index中引入，这样才能生效
整体的monitor设计是订阅发布的模式，在monitor的index主文件入口中订阅需求
有关Error的信息收集是在全局的window下添加error事件进行监听，而具体的错误事件监听需要设置addEventListener的第三个参数以保证不影响原程序

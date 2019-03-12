const path = require('path')
const debug = process.env.NODE_ENV !== 'production'

module.exports = {
    outputDir: 'dist', // 构建输出目录
    assetsDir: 'assets/', // 静态资源目录 (js, css, img, fonts)
    publicPath: './', // 根域上下文目录
    lintOnSave: false, // 是否开启eslint保存检测，有效值：ture | false | 'error'
    devServer: {
        open: true,
        host: 'localhost',
        port: 8081,
        https: false,
        hotOnly: false,
        proxy: { // 配置跨域
            '/api': {
　　　　　　　　　　//要访问的跨域的api的域名
                target: 'http://47.107.167.164:8080/',
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        before: app => { }
    }
}

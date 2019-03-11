const path = require('path')
const debug = process.env.NODE_ENV !== 'production'

module.exports = {
    publicPath: '/', // 根域上下文目录
    lintOnSave: false, // 是否开启eslint保存检测，有效值：ture | false | 'error'
    configureWebpack: config => { // webpack配置，值位对象时会合并配置，为方法时会改写配置
        if (debug) { // 开发环境配置
            config.devtool = 'cheap-module-eval-source-map'
        } else { // 生产环境配置
        }
         Object.assign(config, { // 开发生产共同配置，配置别名
             resolve: {
                 alias: {
                     '@': path.resolve(__dirname, './src'),
                     '@c': path.resolve(__dirname, './src/components'),
                    'vue$': 'vue/dist/vue.esm.js'
                }
            }
         })
    },
    parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
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

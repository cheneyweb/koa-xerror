// 系统配置参数
const config = require('config')
const port = config.server.port
// 应用服务相关
const Koa = require('koa')
const koaBody = require('koa-body')
const xerror = require(__dirname + '/xerror_modules/koa-xerror/index.js')
// 日志相关
const log = require('tracer').colorConsole({ level: config.log.level })
// 路由相关
const Router = require('koa-router')
const router = new Router()

// 初始化应用服务
const app = new Koa()
app.use(xerror(config.error, (ctx, err) => { log.info('额外可选错误处理') }))
app.use(koaBody())
app.use(router.routes())

// 模拟错误
router.get('/test', function (ctx, next) {
    const a = 'error'
    a = 'error2'
    ctx.body = 'hello'
})

// 模拟错误
router.get('/throw', function (ctx, next) {
    throw '抛出异常'
    ctx.body = 'hello'
})

// 启动应用服务
app.listen(port)
log.info(`XError服务启动【执行环境:${process.env.NODE_ENV},端口:${port}】`)
log.info(`GET日志路径 【GET】【localhost:${port}/test】`)
const log = require('tracer').colorConsole()

module.exports = function (errorConfig = {}, errorProcess) {
    errorConfig = errorConfig || {}
    return async function xerror(ctx, next) {
        try {
            await next()
        } catch (err) {
            log.error(err)
            if (errorProcess && typeof (errorProcess) == 'function') {
                errorProcess(ctx, err)
            }
            let res = err
            // 系统错误处理
            if (err.message) {
                ctx.status = err.statusCode || err.status || errorConfig.errStatus || 500
                res = { err: err.message }
            } else if (errorConfig.errStatus) {
                ctx.status = errorConfig.errStatus
            }
            // 是否打印错误栈
            if (errorConfig.debug != false) {
                res.stack = err.stack
            }
            // 错误信息返回
            ctx.body = res
        }
    }
}
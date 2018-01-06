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
            if(err.message){
                ctx.status = err.statusCode || err.status || 500
                res = { err: err.message }
            }
            if (errorConfig.debug != false) {
                res.stack = err.stack
            }
            ctx.body = res
        }
    }
}
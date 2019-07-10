# koa-xerror
Node后端微服务框架，基于koa-xerror中间件，全局错误捕获

[传送门：XServer官网文档](http://www.xserver.top)

框架目录结构
>
    ├── app.js
    ├── config
    │   ├── default.json
    │   ├── develop.json
    │   └── production.json
    ├── node_modules
    ├── package.json
    └── xerror_modules
        └── koa-xerror

快速上手
>
    1、const xerror = require('koa-xerror')
    2、app.use(xerror())

帮助联系
>
	作者:cheneyxu
	邮箱:457299596@qq.com
	QQ:457299596

更新日志
>
	2017.12.10:初版
    2018.01.06:初版完善
    2018.01.29:更新依赖，增加自定义异常HTTP状态码
    2018.03.07:完善自定义错误处理函数
    2019.07.10:更新依赖

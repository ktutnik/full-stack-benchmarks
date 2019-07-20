import Cors from "@koa/cors"
import Joi from "joi"
import Koa from "koa"
import bodyParser from "koa-body"
import Router from "koa-router"

const schema = Joi.object().keys({
    boolean: Joi.boolean().required(),
    number: Joi.number().required(),
    string: Joi.string().required(),
    date: Joi.date().required()
})

const routes = new Router()
    .get("/test", (ctx) => {
        ctx.body = { messages: "Hello world!" }
    })
    .post("/test", (ctx) => {
        const fix = schema.validate(ctx.request.body)
        ctx.body = fix.value
    })

new Koa()
    .use(bodyParser())
    .use(Cors())
    .use(routes.routes())
    .listen(3000)

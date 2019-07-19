import Cors from "cors"
import Joi from "joi"
import express from "express"
import bodyParser from "body-parser"


const schema = Joi.object().keys({
    boolean: Joi.boolean().required(),
    number: Joi.number().required(),
    string: Joi.string().required(),
    date: Joi.date().required()
})

express()
    .use(bodyParser())
    .use(Cors())
    .get("/test", (req, res) => {
        res.send({ message: "Hello world!" })
    })
    .post("/test", (req, res) => {
        const fix = schema.validate(req.body)
        res.send(fix.value)
    })
    .listen(3000)
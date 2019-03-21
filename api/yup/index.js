const Koa = require('koa')
const bodyParser = require('koa-body')
let yup = require('yup');

const app = new Koa()

app.use(bodyParser())

let schema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
  phone: yup.number().positive().integer().required()
  
})

app.use(async ctx => {
  const postBody = await ctx.request.body
  await schema
  .validate(postBody)
  .then(function(value) {
    ctx.body = value
  })
  .catch(function(err) {
    ctx.status = 400
    ctx.body = err
  })
})

module.exports = app.callback()



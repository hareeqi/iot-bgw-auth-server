const routes = require('express')()
const model = require('./model')

routes.post('/user/',(req,res)=>
  sendReply(res,()=>model.create(req.body)))

routes.put('/user/:key',(req,res)=>
  sendReply(res,()=>model.update(req.params.key)))

routes.get('/user/:key',(req,res)=>
  sendReply(res,()=>model.get(req.params.key)))

routes.get('/user/',(req,res)=>
  sendReply(res,()=>model.getAll()))


routes.post('/user/:key/validate',(req,res)=>
  sendReply(res,()=>model.validate(req.params.key,req.body)))

routes.post('/user/:key/renew_key',(req,res)=>
  sendReply(res,()=>model.renew_key(req.params.key)))







const sendReply = async (res,action)=>{
  try{
    const result = await action()
    result? res.status(200).json(result) : res.status(200)
  } catch (e){
    res.status(e.code|| 500).json({error:e})
  }
}

module.exports = routes

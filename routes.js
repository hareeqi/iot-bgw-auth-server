const routes = require('express')()
const model = require('./model')

routes.post('/user/',(req,res)=>
  sendReply(res,()=>model.create(req.body)))

routes.put('/user/:user_id',(req,res)=>
  sendReply(res,()=>model.update(req.params.user_id)))

routes.get('/user/:user_id',(req,res)=>
  sendReply(res,()=>model.get(req.params.user_id)))

routes.get('/user/',(req,res)=>
  sendReply(res,()=>model.getAll()))

routes.post('/user/:user_id/renew_key',(req,res)=>
  sendReply(res,()=>model.renew_key(req.params.user_id)))







const sendReply = async (res,action)=>{
  try{

    const result = await action()

    result? res.status(200).json(result) : res.status(200)
  } catch (e){
    res.status(e.code|| 500).json({error:e})
  }
}

module.exports = routes

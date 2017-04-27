const routes = require('express')()
const model = require('./model')

routes.post('/user/',(req,res)=>
  sendReply(res,()=>model.create(req.body)))

routes.get('/user/',(req,res)=>
  sendReply(res,()=>model.getAll()))

routes.get('/user/:user_id',(req,res)=>
  sendReply(res,()=>model.get(req.params.user_id)))

routes.patch('/user/:user_id',(req,res)=>
  sendReply(res,()=>model.update(req.params.user_id,req.body)))

routes.delete('/user/:user_id',(req,res)=>
  sendReply(res,()=>model.remove(req.params.user_id)))

routes.post('/user/:user_id/renew_key',(req,res)=>
  sendReply(res,()=>model.renew_key(req.params.user_id)))


const sendReply = async (res,action)=>{
  try{
    const result = await action()
    result? res.status(200).json(result) : res.sendStatus(200)
  } catch (e){
    res.status(e.code|| 500).json({error:e.message})
  }
}

module.exports = routes

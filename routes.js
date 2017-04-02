const routes = require('express')()

routes.post('/validate',(req,res)=>{
  res.status(200).json({allowed:true})
})

module.exports = routes

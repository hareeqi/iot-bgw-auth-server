const routes = require('express')()



routes.get('/validate',(req,res)=>{
  res.status(200).json({status:true})
})

module.exports = routes

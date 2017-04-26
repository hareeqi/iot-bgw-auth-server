const fs = require('fs');
const config = require('./config')
const level = require('level')
const auth = require('../iot-bgw-auth-client')


const db = level(config.db_file_path);

const get = (key)=> new Promise((resolve, reject) =>{
  db.get(key,(error,value)=> error ? reject({code:404,message:error.message}) : resolve(JSON.parse(value)))
})
const del = (key)=> new Promise((resolve, reject) =>{
  db.del(key,(error)=> error ? reject('DB_ERROR') : resolve())
})
const put = (key,value)=> new Promise((resolve, reject) =>{
  db.put(key,JSON.stringify(value),(error)=> (error ? reject('DB_ERROR') : resolve()))
})



const getAll =  ()=>new Promise((resolve, reject) =>{
  let users = []
  db.createValueStream()
  .on('data', function (value) {
    const {user_id,name,created,updated} = JSON.parse(value)
    users.push({user_id,name,created,updated})
  })
  .on('error', function (err) {
    reject('DB_ERROR');
  })
  .on('close', function () {
    resolve(users)
  })
})
const key = auth.genId
const sign = auth.sign

module.exports = {
  get,getAll,del,put,key,sign,
}


setTimeout(async()=>{
  console.log('=============================================================================')
  console.log('=============================================================================')
  console.log('=================================  Admin Key  ===============================')
  console.log('')
  console.log('        ',(await require('./model').create({user_id:'admin',rules:['#']})).key)
  console.log('')
  console.log('=============================================================================')
  console.log('=============================================================================')
},1000)

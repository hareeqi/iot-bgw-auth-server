const fs = require('fs');
const path = require('path')
const config = require('./config')
const level = require('level')
const {genId,sign, AAA, CAT} = require('../iot-bgw-aaa-client')


const db = level(config.db_file_path);

const get = (key)=> new Promise((resolve, reject) =>{
  db.get(key,(error,value)=> error ? reject({code:404,message:error.message}) : resolve(JSON.parse(value)))
})
const del = (key)=> new Promise((resolve, reject) =>{
  db.del(key,(error)=> error ? reject({code:404,message:error.message}) : resolve())
})
const put = (key,value)=> new Promise((resolve, reject) =>{
  db.put(key,JSON.stringify(value),(error)=> (error ? reject({code:404,message:error.message}) : resolve()))
})


const getAll =  ()=>new Promise((resolve, reject) =>{
  let users = []
  db.createValueStream()
  .on('data', function (value) {
    const {user_id,name,created,updated, issued, valid_from, valid_to, rules_policy_deny_match } = JSON.parse(value)
    users.push({user_id,name,created,updated, issued, valid_from, valid_to, rules_policy_deny_match })
  })
  .on('error', function (err) {
    reject('DB_ERROR');
  })
  .on('close', function () {
    resolve(users)
  })
})

module.exports = {
  get,getAll,del,put,genId,sign,
}


setTimeout(async()=>{
  AAA.log(CAT.PROCESS_START,`Admin key is available in the following path ${config.api_admin_key_file_path}`)
  const key = (await require('./model').create({user_id:'admin',rules:['#']})).key
  fs.writeFileSync(path.join(config.api_admin_key_file_path,key),key)
},500)

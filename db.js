const config = require('./config')
const uuid = require('uuid/v4');

const level = require('level')


const db = level(config.db_file_path);


module.exports.get = (key)=> new Promise((resolve, reject) =>{
  db.get(key,(error,value)=> error ? reject({code:404,message:error.message}) : resolve(JSON.parse(value)))
})
module.exports.del = (key)=> new Promise((resolve, reject) =>{
  db.del(key,(error)=> error ? reject('DB_ERROR') : resolve())
})
module.exports.put = (key,value)=> new Promise((resolve, reject) =>{
  db.put(key,JSON.stringify(value),(error)=> (error ? reject('DB_ERROR') : resolve()))
})

module.exports.getAll =  ()=>new Promise((resolve, reject) =>{
  let users = []
  db.createValueStream()
  .on('data', function (value) {
    const {user_id,name,created,updated} = JSON.parse(value)
    users.push({user_id,name,created,updated})
  })
  .on('error', function (err) {
    console.log("DB_ERROR",err);
    reject('DB_ERROR');
  })
  .on('close', function () {
    resolve(users)
  })
})
module.exports.key = ()=>uuid().replace(/-/g,'')

setTimeout(()=>{
  require('./model').create({user_id:'admin',rules:['#']})

},1000)

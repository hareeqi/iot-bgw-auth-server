const config = require('./config')
const uuid = require('uuid/v4');

const level = require('level')


const db = level(config.db_file_path);

module.exports.get = (key)=> new Promise((resolve, reject) =>{
  db.get(key,(error,value)=> error ? reject('DB_ERROR') : resolve(value))
})
module.exports.del = (key)=> new Promise((resolve, reject) =>{
  db.del(key,(error)=> error ? reject('DB_ERROR') : resolve())
})
module.exports.put = (key,value)=> new Promise((resolve, reject) =>{
  db.put(key,vlaue,(error)=> error ? reject('DB_ERROR') : resolve())
})

module.exports.getAll =  ()=>new Promise((resolve, reject) =>{
  let users = []
  db.createReadStream()
  .on('data', function ({key,name,created,updated}=x) {
    users.push({key,name,created,updated})
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

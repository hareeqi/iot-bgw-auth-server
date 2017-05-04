const db =  require('./db')
const config = require('./config')

class User {

  async create (user={}){
    let  already_exist = false
    try {
      already_exist =  await db.get(user.user_id)
    } catch (e) {}
    
    if(already_exist && user.user_id != 'admin'){
      throw {message:'user id already exist'}
    }
    user.user_id = user.user_id || db.genId()
    user.created = Date.now()
    user.updated = user.created
    user.issued = user.created
    user.valid_from = user.valid_from || user.created
    user.valid_to = user.valid_to || (user.created + config.valid_to.split('*').reduce((t,c)=>(t*c),1000))
    user.rules = user.rules || []
    const sign = await db.sign(user.user_id)
    user.password = sign.password_hash
    db.put(user.user_id,user);
    return {key:sign.key}
  }

  remove (user_id){
    db.del(user_id)
  }

  async update(user_id,new_user) {
    this.cleanUser(new_user)
    const old_user = await db.get(user_id);
    Object.assign(old_user,new_user)
    old_user.updated = Date.now()
    db.put(user_id,old_user);
  }

  async get (user_id){
    let user =  await db.get(user_id)
    return user;
  }

  getAll(){
    return  db.getAll()
  }
  async renew_key(user_id){
    let user = await db.get(user_id)
    user.updated = Date.now()
    user.issued = user.updated
    const sign = await db.sign(user_id)
    user.password = sign.password
    db.put(user.user_id,user);
    return {key:sign.key}
  }

  cleanUser(user){
    delete user.user_id
    delete user.password
    delete user.created
    delete user.issued
  }

}
module.exports = new User()

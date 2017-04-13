const db =  require('./db')


class User {

  async create (user){
    user.created = Date.now()
    user.updated = user.created
    user.user_id = user.user_id || db.key()
    const sign = await db.sign(user.user_id)
    user.password = sign.password_hash
    db.put(user.user_id,user);
    return {key:sign.key}
  }
  update(key,user) {
    user.updated = Date.now()
    db.put(key,user);
  }
  get (user_id){
    return db.get(user_id)
  }
  getAll(){
    return  db.getAll()
  }
  async renew_key(user_id){
    let user = await db.get(user_id)
    user.updated = Date.now()
    const sign = await db.sign(user_id)
    user.password = sign.password
    db.put(user.user_id,user);
    return {key:sign.key}
  }


}
module.exports = new User()

const db =  require('./db')


class User {

  create (user){
    user.created = Date.now()
    user.updated = user.created
    user.user_id = user.user_id || db.key()
    db.put(user.user_id,user);
    return {key:user.user_id}
  }
  update(key,user) {
    user.updated = Date.now()
    db.put(key,user);
  }
  async get (user_key){
    return await db.get(user_key)
  }
  async getAll(){
    return await db.getAll()
  }
  async validate(user_key,data){
    const user = await db.get(user_key)
    return {status:this.validate_func(user,data)}
  }
  async renew_key(key){
    let user = await db.get(user_key)
    db.del(key)
    user.key= db.key()
    db.put(user.key,user);
    return {key:user.key}
  }
  validate_func(user_data,req)  {

    if (!(user_data && user_data.rules) || !req) {
      return false
    }

    //mqtt match taken https://github.com/ralphtheninja/mqtt-match
    const mqtt_match = (filter,topic)=> {
      const filterArray = filter.split('/')
      const length = filterArray.length
      const topicArray = topic.split('/')

      for (var i = 0; i < length; ++i) {
        var left = filterArray[i]
        var right = topicArray[i]
        if (left === '#') return true
        if (left !== '+' && left !== right) return false
      }

      return length === topicArray.length
    }



    req = `${req.protocol}/${req.method}/${req.host}/${req.port}/${req.path}`
    return !!user_data.rules.find((rule)=>mqtt_match(rule,req))

  }

}
module.exports = new User()

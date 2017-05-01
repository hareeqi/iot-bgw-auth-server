let config = {
  bind_address: "127.0.0.1",
  bind_port: 5055,
  db_file_path:"./bgw_db",
  cache_for:"60*60",
  valid_to:"365*24*60*60",
  aaa_client:{
    name:"auth-server",
    log_level:'info',
    no_color:false,
    timestamp:false,
    disable_cat:[],
    secret:"./config/key.pem"
  }
}


require('../iot-bgw-aaa-client').init("AUTH_SERVER",config)

module.exports = config;

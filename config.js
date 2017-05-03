let config = {
  bind_address: "127.0.0.1",
  bind_port: 5055,
  db_file_path:"./config/bgw_db",
  api_admin_key_file_path:"./config/",
  valid_to:"365*24*60*60",
  aaa_client:{
    name:"auth-server",
    log_level:'info',
    no_color:false,
    timestamp:false,
    disable_cat:[],
    secret: process.env.TLS_KEY || "./config/key.pem"
  }
}


require('../iot-bgw-aaa-client').init("AUTH_SERVER",config)

module.exports = config;

const app = require('express')()
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config')
const {AAA, CAT} = require('../iot-bgw-aaa-client')

const auth_provider = config.aaa_client.auth_provider
if(auth_provider !="internal"){
  console.log("The BGW uses",auth_provider,"and does not use the internal auth provider, shutting down...  ");
  process.exit(0);
}


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req,res,next)=>{

    if(req.headers.authorization == config.aaa_client.secret){
      next()
    } else {
      res.status(403).json({status:false, error:'The BGW HTTP or MQTT Proxy could not Connect AAA Client Secret Mismatch ' })
    }
})

app.use(require('./routes'))


app.listen(config.bind_port, config.bind_address,()=>
AAA.log(CAT.PROCESS_START,`listening on ${config.bind_address}:${config.bind_port}`));

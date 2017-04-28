const app = require('express')()
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config.json')

const {AAA, CAT} = require('../iot-bgw-aaa-client').init(config)

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req,res,next)=>{

    if(req.headers.authorization == config.aaa_client.secret){
      next()
    } else {
      res.status(403).json({status:false, error:'Invalid border gateway admin key' })
    }
})

app.use(require('./routes'))


app.listen(config.bind_port, config.bind_address,()=>
AAA.log(CAT.PROCESS_START,`iot-bgw-auth listening on ${config.bind_address}:${config.bind_port}`));

const app = require('express')()
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config.json')


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('./routes'))


app.listen(config.bind_port, config.bind_address,()=>
console.log("iot-bgw-auth listening on %s:%d ",config.bind_address,  config.bind_port));

const bleno = require("bleno")
// const interfaces = require('os').networkInterfaces()
const os = require('os')
// const { v4: uuidv4 } = require('uuid') 

// const addressUUID = uuidv4()
// const properties = ['read']

const Characteristic = bleno.Characteristic

class AddressCharacteristic extends Characteristic{
    constructor(){
        super({uuid:"2d75504c-b822-44b3-bb81-65d7b6cbdae1",properties:['read']})
        this.address = '0.0.0.0'
        this.getIpAddress()
    }

    onReadRequest(offset, callback){
        if(offset){
            console.log(offset,this.RESULT_ATTR_NOT_LONG)
            callback(this.RESULT_ATTR_NOT_LONG,null)
        } else {
            this.getIpAddress()
            const buf = new Buffer.from(this.address,'utf-8')
            console.log("on read request value ",buf.toString('hex'))
            console.log("on read request value ",buf.toString())
            console.log(offset,this.RESULT_SUCCESS)
            callback(this.RESULT_SUCCESS,buf)
        }
    }

    getIpAddress(){
        const interfaces = os.networkInterfaces();
        exit_loops:
        for (var devName in interfaces) {
            var iface = interfaces[devName];
            for (var i = 0; i < iface.length; i++) {
                console.log(iface[i]);
              var alias = iface[i];
              if (alias.iface == 'wlan0' && alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                this.address=alias.address
                console.log("address is!! ",this.address);
                break exit_loops
              }
            }
          }
    }
}

module.exports = AddressCharacteristic


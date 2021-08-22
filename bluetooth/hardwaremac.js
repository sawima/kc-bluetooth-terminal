const bleno = require("bleno")
const os = require('os')

const Characteristic = bleno.Characteristic

class MacCharacteristic extends Characteristic{
    constructor(){
        super({uuid:"c537baa5-6201-4275-ab14-da353bde3dc3",properties:['read']})
        this.mac = 'ff:ff:ff:ff:ff:ff'
        this.getMacAddress()
    }

    onReadRequest(offset, callback){
        if(offset){
            callback(this.RESULT_ATTR_NOT_LONG,null)
        } else {
            this.getMacAddress()
            const buf = new Buffer.from(this.mac,'utf-8')
            // console.log("on read request value ",buf.toString('hex'))
            console.log("on read request value ",buf.toString())
            console.log(offset,this.RESULT_SUCCESS)
            callback(this.RESULT_SUCCESS,buf)
        }
    }

    getMacAddress(){
        const interfaces = os.networkInterfaces();
        this.mac = 'ff:ff:ff:ff:ff:ff'
        exit_loops:
        for (var devName in interfaces) {
            var iface = interfaces[devName];
            for (var i = 0; i < iface.length; i++) {
              var alias = iface[i];
              if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                this.mac=alias.mac
                console.log("hardware ddress is!! ",this.mac);
                break exit_loops
              }
            }
        }
        
    }
}

module.exports = MacCharacteristic


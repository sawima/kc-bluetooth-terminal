const bleno = require("bleno")
const interfaces = require('os').networkInterfaces()
const { wifiInfo } = require('../network/wifi')
// const { v4: uuidv4 } = require('uuid')


// const addressUUID = uuidv4()
// const properties = ['read']

const Characteristic = bleno.Characteristic

class WifiCharacteristic extends Characteristic{
    constructor(){
        super({uuid:"f9e9e098-77d4-4db3-a08f-8321c493431b",properties:['read']})
        this.ssid = ''
        this.getWifiInfo()
    }

    onReadRequest(offset, callback){
        if(offset){
            console.log(offset,this.RESULT_ATTR_NOT_LONG)
            callback(this.RESULT_ATTR_NOT_LONG,null)
        } else {
            this.getWifiInfo()
            const buf = new Buffer.from(this.ssid,'utf-8')
            console.log("on read request value ",buf.toString('hex'))
            console.log("on read request value ",buf.toString())
            console.log(offset,this.RESULT_SUCCESS)
            callback(this.RESULT_SUCCESS,buf)
        }
    }

    getWifiInfo(){
        const that = this
        wifiInfo().then((wifiID)=>{
            console.log(wifiID);
            that.ssid=wifiID
        }).catch((error)=>{
            that.ssid=""
            console.log("error ",error);
        })
    }
}

module.exports = WifiCharacteristic


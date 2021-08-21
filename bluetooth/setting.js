const bleno = require("bleno")
const interfaces = require('os').networkInterfaces()
const { v4: uuidv4 } = require('uuid') 

const Characteristic = bleno.Characteristic

class SettingCharacteristic extends Characteristic{
    constructor(){
        super({uuid:"493ebfb0-b690-4ae8-a77a-329619c6f613",properties:['write'],value:null})
        this._value = new Buffer.alloc(0)
        this._updateValueCallback = null
        // this._onChange = null
        this._onReceiveSetup = null
    }

    onWriteRequest(data,offset,withoutResponse,callback){
        console.log("SettingCharateristic - onWriteRequest: value = ", data.toString())
        const setup = JSON.parse(data.toString())
        console.log(setup);
        if(setup){
            console.log(this._onReceiveSetup)
            if(this._onReceiveSetup){
                this._onReceiveSetup(setup)
            }
        }
    }

    // addChangeListener(callback){
    //     this._onChange = callback
    // }

    setReceiveSetupListener(callback){
        this._onReceiveSetup = callback
    }
}

module.exports = SettingCharacteristic


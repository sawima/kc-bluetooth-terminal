const bleno = require("bleno")
// const interfaces = require('os').networkInterfaces()
const { v4: uuidv4 } = require('uuid') 

// const addressUUID = uuidv4()
// const properties = ['read']

const Characteristic = bleno.Characteristic

class SettingCharacteristic extends Characteristic{
    constructor(){
        super({uuid:uuidv4(),properties:['write'],value:null})
        this._value = new Buffer.alloc(0)
        this._updateValueCallback = null
        this._onChange = null
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
        // var result = Characteristic.RESULT_SUCCESS;
        callback(this.RESULT_SUCCESS);
    }

    addChangeListener(callback){
        this._onChange = callback
    }

    setReceiveSetupListener(callback){
        this._onReceiveSetup = callback
    }
}

module.exports = new SettingCharacteristic()


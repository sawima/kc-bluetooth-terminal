const bleno = require("bleno")
const interfaces = require('os').networkInterfaces()
const { v4: uuidv4 } = require('uuid') 

// const addressUUID = uuidv4()
// const properties = ['read']

const Characteristic = bleno.Characteristic

class ActionCharacteristic extends Characteristic{
    constructor(){
        super({uuid:uuidv4(),properties:['write','read'],value:null})
        this._value = new Buffer.alloc(0)
        this._updateValueCallback = null
        this._onChange = null
        thiss._onReceiveSetup = null
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

    addChangeListener(callback){
        this._onChange = callback
    }

    setReceiveSetupListener(callback){
        this._onReceiveSetup = callback
    }

    onReadRequest(offset, callback) {
        console.log('CustomCharacteristic onReadRequest');
        var data = new Buffer.alloc(1);
        data.writeUInt8(42, 0);
        callback(this.RESULT_SUCCESS, data);
    };
}

module.exports = SettingCharacteristic


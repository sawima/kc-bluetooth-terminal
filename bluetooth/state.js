const bleno = require("bleno")
const interfaces = require('os').networkInterfaces()
const { v4: uuidv4 } = require('uuid') 

// const addressUUID = uuidv4()
// const properties = ['read']

const Characteristic = bleno.Characteristic

class StateCharacteristic extends Characteristic{
    constructor(){
        super({uuid:"c6c8c1a3-5b3e-439c-b6cc-a9b8708a075c",properties:['read','notify']})
        this.state = {
            connected: false
        }
    }

    onReadRequest(offset, callback){
        if(offset){
            console.log(offset,this.RESULT_ATTR_NOT_LONG)
            callback(this.RESULT_ATTR_NOT_LONG,null)
        } else {
            const buf = new Buffer.from(JSON.stringify(this.state),'utf-8')
            console.log("on read request value ",buf.toString('hex'))
            console.log("on read request value ",buf.toString())
            console.log(offset,this.RESULT_SUCCESS)
            callback(this.RESULT_SUCCESS,buf)
        }
    }

    onSubscribe(maxValueSize,updateValueCallback){
        console.log("StateCharateristic - onSubscribe")

        this._updateValueCallback = updateValueCallback
    }

    onUnsubscribe(){
        console.log("StateCharateristic - onUnSubscribe")

        this._updateValueCallback = null
    }

    setState(connected){
        console.log(connected);
        this.state ={
            connected
        }

        if(this._updateValueCallback){
            const buf = new Buffer.from(JSON.stringify(this.state),'utf-8')
            console.log("StateCharacteristic - onWriteRequest: nofitying")
            this._updateValueCallback(buf)
        }
    }
}

module.exports = StateCharacteristic


const bleno = require('blueno')
const { v4: uuidv4 } = require('uuid')

const BlenoPrimaryService = bleo.PrimaryService
const primaryServiceUuid = uuidv4()

const AddressCharacteristic =  require("./address")
const SettingCharacteristic = require('./setting')
const StateCharacteristic = require('./state')

class BluetoothSetupServer{
    constructor(){
        this.address = AddressCharacteristic,
        this.state = StateCharacteristic,
        this.setting = SettingCharacteristic
    }

    setReceiveSetupListener(onReceiveSetup){
        this.setting.setReceiveSetupListener(onReceiveSetup)
    }

    getIpAddress(){
        this.address.getIpAddress()
    }

    startBle(){
        console.log('start wifi config through ble')
        bleno.on("stateChange",(state)=>{
            console.log("on =< stateChange", state);
            if(state === 'pweredOn'){
                bleno.startAdvertising("kima ternimal",[primaryServiceUuid])
            } else {
                bleno.stopAdvertising()
            }
        })
        
        bleno.on("advertisingStart",(err)=>{
            console.log("oon advertising Start: "+ (error ? 'error' + error: 'sucess'));
        
            if(!error){
                bleno.setService([
                    new BlenoPrimaryService({
                        uuid:primaryServiceUuid,
                        characteristics:[this.address,this.state,this.setting]
                    })
                ])
            }
        })
    }
    connectionSuccessed(){
        this.state.setState(true)
    }
}

module.exports = BluetoothSetupServer
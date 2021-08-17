const bleno = require('bleno')
const { v4: uuidv4 } = require('uuid')

const BlenoPrimaryService = bleno.PrimaryService
const primaryServiceUuid = uuidv4()

const AddressCharacteristic =  require("./address")
const SettingCharacteristic = require('./setting')
const StateCharacteristic = require('./state')

class BluetoothSetupServer{
    constructor(){
        this.address =  new AddressCharacteristic(),
        this.state = new StateCharacteristic(),
        this.setting =  new SettingCharacteristic()
    }

    setReceiveSetupListener(onReceiveSetup){
        this.setting.setReceiveSetupListener(onReceiveSetup)
    }

    getIpAddress(){
        this.address.getIpAddress()
    }

    startBle(){
        console.log('start wifi config through ble')
        bleno.on('stateChange', function(state) {
            console.log('on -> stateChange: ' + state);
                if (state === 'poweredOn') {
                    console.log("request startAdvertising");
                    bleno.startAdvertising('kima blue', [primaryServiceUuid]);  
                } else {
                    console.log("request stopAdvertising");
                    bleno.stopAdvertising(); 
                }
            });
        // const setupCharacteristic = this.setup
        const stateCharacteristic = this.state
        const addressCharacteristic = this.address
        const settingCharacteristic = this.setting
        bleno.on('advertisingStart', function(error) {
            console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));
        
            if (!error) {
                bleno.setServices([
                    new BlenoPrimaryService({
                        uuid: primaryServiceUuid,
                        name: "what the service",
                        characteristics: [
                            settingCharacteristic,
                            stateCharacteristic,
                            addressCharacteristic
                        ]
                    })
                ]);
            }
        });
    }
    connectionSuccessed(){
        this.state.setState(true)
    }
}

module.exports = BluetoothSetupServer
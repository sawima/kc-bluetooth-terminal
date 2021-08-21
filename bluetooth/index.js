const bleno = require('bleno')
const { v4: uuidv4 } = require('uuid')

const BlenoPrimaryService = bleno.PrimaryService
const primaryServiceUuid = 'd6cb1959-8010-43bd-8ef7-48dbd249b984'

const AddressCharacteristic =  require("./address")
const SettingCharacteristic = require('./setting')
const StateCharacteristic = require('./state')
const WifiCharacteristic = require('./wifiInfo')

class BluetoothSetupServer{
    constructor(){
        this.address =  new AddressCharacteristic(),
        this.state = new StateCharacteristic(),
        this.setting =  new SettingCharacteristic()
        this.wifiInfo = new WifiCharacteristic()
    }

    setReceiveSetupListener(onReceiveSetup){
        this.setting.setReceiveSetupListener(onReceiveSetup)
    }

    getIpAddress(){
        this.address.getIpAddress()
    }

    getWifiInfo(){
        this.wifiInfo.getWifiInfo()
    }

    startBle(){
        console.log('start wifi config through ble')
        bleno.on('stateChange', function(state) {
            console.log('on -> stateChange: ' + state);
                if (state === 'poweredOn') {
                    console.log("request startAdvertising");
                    bleno.startAdvertising('kima-ble', [primaryServiceUuid]);  
                } else {
                    console.log("request stopAdvertising");
                    bleno.stopAdvertising(); 
                }
            });
        // const setupCharacteristic = this.setup
        const stateCharacteristic = this.state
        const addressCharacteristic = this.address
        const settingCharacteristic = this.setting
        const wifiCharacteristic = this.wifiInfo
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
                            addressCharacteristic,
                            wifiCharacteristic
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
const BluetoothSetupServer = require('./bluetooth/index')
const { wifiConnect } = require("./network/wifi")

const bluServer = new BluetoothSetupServer()

bluServer.setReceiveSetupListener(setup => {
    wifiConnect.connect(setup).then(()=>{
        console.log("network connected");
        bluServer.getIpAddress();
        bluServer.getWifiInfo();
    }).catch((err)=>{
        console.log("error happend",err);
    });
    // wificonn
    //   .connect(setup.ssid, setup.psk)
    //   .then(() => {
    //     bluServer.getIpAddress()
    //     bluServer.connectionSucceed()
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  })

console.log('starting ble server')
bluServer.startBle()

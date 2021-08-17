const BluetoothSetupServer = require('./bluetooth/index')
const wificonn = require("./network/wifi")

const bluServer = new BluetoothSetupServer()

bluServer.setReceiveSetupListener(setup => {
    wificonn.connect(setup).then(()=>{
        console.log("network connected");
        bluServer.getIpAddress();
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

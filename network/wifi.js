var wifi = require('node-wifi');

wifi.init({ iface: "wlan0" });
// wifi.init({ iface: "wlp3s0" });

const wifiConnect = (setting) => {
    wifi.disconnect().then(()=>{
        return new Promise((resolve, reject) => {
            wifi.disconnect().then(()=>{
                wifi.scan().then((networks))
            })
            wifi.scan((error, networks) => {
                if (error) {
                    reject(error)
                } else {
                    console.log(networks);
                    wifi.connect(setting, err => {
                        if (err) {
                            reject(err)
                        }
                        console.log("wifi connected");
                        resolve();
                    });
                }
            })
        })
    })


}

module.exports.wifiConnect = wifiConnect

exports.wifiInfo = () => {
    return new Promise((resolve,reject)=>{
        wifi.getCurrentConnections((error, currentConnections) => {
            if (error) {
                console.log("error",error);
                reject()
            } else {
                console.log("current connection!");
                console.log(currentConnections);
                console.log(typeof(currentConnections));
    
                if(currentConnections && Object.keys(currentConnections).length === 0 ){
                    console.log("current connection is a empty object");
                    resolve(null)
                } else{
                    let ssid = "";
                    for(var conn of currentConnections){
                        if(conn.iface == 'wlan0'){
                            ssid = conn.ssid
                            break;
                        }
                    }
                    console.log("find ssid",ssid);

                    resolve(ssid);
                }
            }
        })
    })
}

// scanNetork = ()=>{
//     return new Promise((resolve,reject)=>{
//         wifi.scan((error, networks) => {
//             if (error) {
//                 reject()
//             } else {
//                 resolve()
//             }
//         })
//     })   
// }

// module.exports.connect=(setting)=>{
//     wifi.init({iface: "wlp3s0" });
//     wifi.scan((error, networks) => {
//         if (error) {
//             return new Promise((resolve,reject)=>{
//                 reject()
//             })
//         } else {
//             return new Promise((resolve,reject)=>{
//                 wifi.connect(setting, error => {
//                     if (error) {
//                       reject()
//                     }
//                     console.log("wifi connected");
//                     resolve();
//                   });
//             })
//         }
//     })
// }




// Initialize wifi module
// Absolutely necessary even to set interface to null
// wifi.init({
//   iface: "wlp3s0" // network interface, choose a random wifi interface if set to null
// });

// // Scan networks
// wifi.scan((error, networks) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(networks);
//     /*
//         networks = [
//             {
//               ssid: '...',
//               bssid: '...',
//               mac: '...', // equals to bssid (for retrocompatibility)
//               channel: <number>,
//               frequency: <number>, // in MHz
//               signal_level: <number>, // in dB
//               quality: <number>, // same as signal level but in %
//               security: 'WPA WPA2' // format depending on locale for open networks in Windows
//               security_flags: '...' // encryption protocols (format currently depending of the OS)
//               mode: '...' // network mode like Infra (format currently depending of the OS)
//             },
//             ...
//         ];
//         */
//   }
// });

// Connect to a network
// wifi.connect({ ssid: 'p30', password: '79860023' }, error => {
//   if (error) {
//     console.log(error);
//   }
//   console.log('Connected');
// });

// Disconnect from a network
// not available on all os for now
// wifi.disconnect(error => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Disconnected');
//   }
// });

// Delete a saved network
// not available on all os for now
// wifi.deleteConnection({ ssid: 'ssid' }, error => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Deleted');
//   }
// });

// List the current wifi connections
// wifi.getCurrentConnections((error, currentConnections) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("current connection!");
//     console.log(currentConnections);
//     console.log(typeof(currentConnections));

//     if(currentConnections && Object.keys(currentConnections).length === 0 ){
//       console.log("current connection is a empty object");
//       wifi.connect({ ssid: 'p30', password: '79860023' }, error => {
//         if (error) {
//           console.log(error);
//         }
//         console.log('Connected');
//       });
//     }
//     // if(currentConnections){
//     //   wifi.connect({ ssid: 'p30', password: '79860023' }, error => {
//     //     if (error) {
//     //       console.log(error);
//     //     }
//     //     console.log('Connected');
//     //   });
//     // }


//     /*
//     // you may have several connections
//     [
//         {
//             iface: '...', // network interface used for the connection, not available on macOS
//             ssid: '...',
//             bssid: '...',
//             mac: '...', // equals to bssid (for retrocompatibility)
//             channel: <number>,
//             frequency: <number>, // in MHz
//             signal_level: <number>, // in dB
//             quality: <number>, // same as signal level but in %
//             security: '...' //
//             security_flags: '...' // encryption protocols (format currently depending of the OS)
//             mode: '...' // network mode like Infra (format currently depending of the OS)
//         }
//     ]
//     */
//   }
// });

// All functions also return promise if there is no callback given
// wifi
//   .scan()
//   .then(networks => {
//     // networks
//   })
//   .catch(error => {
//     // error
//   });
// Connect to a network
// wifi.connect({ ssid: 'p30', password: '79860023' }, error => {
//   if (error) {
//     console.log(error);
//   }
//   console.log('Connected');
// });


// wifi.connect({ ssid: 'p30', password: '79860023' }, error => {
//   if (error) {
//     console.log(error);
//   }
//   console.log('Connected');
// });

// wifi.connect({ ssid: 'p30', password: '79860023' }, error => {
//   if (error) {
//     console.log(error);
//   }
//   console.log('Connected');
// });

// module.exports.connect = (setup)=>{
//     wifi.init({
//         iface: "wlp3s0" // network interface, choose a random wifi interface if set to null
//       });

//       // Scan networks

//           /*
//               networks = [
//                   {
//                     ssid: '...',
//                     bssid: '...',
//                     mac: '...', // equals to bssid (for retrocompatibility)
//                     channel: <number>,
//                     frequency: <number>, // in MHz
//                     signal_level: <number>, // in dB
//                     quality: <number>, // same as signal level but in %
//                     security: 'WPA WPA2' // format depending on locale for open networks in Windows
//                     security_flags: '...' // encryption protocols (format currently depending of the OS)
//                     mode: '...' // network mode like Infra (format currently depending of the OS)
//                   },
//                   ...
//               ];
//               */

//               wifi.connect(setup, error => {
//                 if (error) {
//                   console.log(error);
//                 }
//                 console.log('Connected');
//               });
//         }
//       });


// }
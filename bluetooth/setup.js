/*  characteristic.js 
 *  A simple custom BLE peripheral characteristic for use with Node.js and bleno.
 *  This characteristic supports read, write, and notify properties.
 *  Julian Hays - 10/14/19
 */

var bleno = require('bleno'); //or 'bleno-mac' if you are using that
var BlenoCharacteristic = bleno.Characteristic;

const uuid = 'fd758b93-0bfa-4c52-8af0-85845a74a606';
const properties = ['read', 'write', 'notify'];


var isSubscribed = false
var notifyInterval = 5 //seconds

function delayedNotification(callback) {
	setTimeout(function() { 
		if (isSubscribed) {
			var data = Buffer(3);
			var now = new Date();
			data.writeUInt8(now.getHours(), 0);
			data.writeUInt8(now.getMinutes(), 1);
			data.writeUInt8(now.getSeconds(), 2);
			callback(data);
			delayedNotification(callback);
		}
	}, notifyInterval * 1000);
}

class SetupClass extends BlenoCharacteristic{
    constructor(){
        super({uuid,properties})
        this._value = new Buffer.alloc(0);
	    this._updateValueCallback = null;
    };
    onReadRequest(offset, callback) {
        console.log('CustomCharacteristic onReadRequest');
        var data = new Buffer.alloc(1);
        data.writeUInt8(42, 0);
        callback(this.RESULT_SUCCESS, data);
    };
    onWriteRequest(data, offset, withoutResponse, callback) {
        this._value = data;
        console.log('CustomCharacteristic - onWriteRequest: value = ' + this._value.toString('hex'));
        callback(this.RESULT_SUCCESS);
    };
    onSubscribe(maxValueSize, updateValueCallback) {
        console.log('CustomCharacteristic - onSubscribe');
        isSubscribed = true;
        delayedNotification(updateValueCallback);
        this._updateValueCallback = updateValueCallback;
    };
    onUnsubscribe() {
        console.log('CustomCharacteristic - onUnsubscribe');
        isSubscribed = false;
        this._updateValueCallback = null;
    };
}


// module.exports = new SetupClass(uuid,properties);
module.exports = SetupClass
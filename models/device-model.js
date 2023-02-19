var mongoose = require('mongoose');
mongoose.set('strictQuery', false);

//metadata-just device info
var DeviceSchema = new mongoose.Schema({
	deviceName: {type: String},
	deviceId: {type: String},
	properties: {},
	fields: {},
	deviceType: {}
});  

//device attributes like accelerometer, gps
var DeviceEventSchema = new mongoose.Schema({
	deviceId: {type: String},
	deviceType: {type: String},
	events: {}
})

var MedicalDeviceSchema = new mongoose.Schema({
	deviceId: {type: String},
	deviceType: {type: String},
	events: {}
})

// module.exports = mongoose.model('Device', DeviceSchema)
// module.exports = mongoose.model('DeviceTrigger', DeviceTriggerSchema)


const Device1 = mongoose.model('Device', DeviceSchema);
const Device2 = mongoose.model('DeviceEvent', DeviceEventSchema);
const Device3 = mongoose.model('MedicalDevice', MedicalDeviceSchema);

module.exports = {
	Device1,
	Device2,
	Device3
}

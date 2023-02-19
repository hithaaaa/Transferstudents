

var ArduinoIotClient = require('@arduino/arduino-iot-client');

const {Device1} = require('../models/device-model');
const {Device2} = require('../models/device-model');

createDevice = (req, res) => {
	var req_body = req.query;
	

	const device = new Device({
		deviceName: req_body.device_name,
		deviceId: req_body.device_id	
	});
	// const deviceTrigger = new Device({
	// 	deviceName: req_body.device_name,
	// 	deviceId: req_body.device_id	
	// });

	device
        .save({ suppressWarning: true })
        .then(() => {
            return res.status(201).json({
                success: true,
                id: device._id,
                message: 'device created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'device not created!',
            })
        })

}

deleteDevice = (req, res) => {
	var response = req.query;
	//delete device in iot cloud

	// const deviceTrigger = new Device({
	// 	deviceName: req_body.device_name,
	// 	deviceId: req_body.device_id	
	// });

	Device1.remove({deviceId:req.body.device_id}).exec(function(err){
		console.log(err);
		Device1.find().exec(function(err, data) {
			res.send(data);
		})
	}) 
        

}

//function updates device properties created byy createdevice()
// createDeviceEvent = (req, res) => {
// 	var req_body = req.body;
	

// 	const device2 = new Device2({
// 		deviceName: req_body.device_name,
// 		deviceId: req_body.device_id	
// 	});
// 	// const deviceTrigger = new Device({
// 	// 	deviceName: req_body.device_name,
// 	// 	deviceId: req_body.device_id	
// 	// });

// 	device
//         .save({ suppressWarning: true })
//         .then(() => {
//             return res.status(201).json({
//                 success: true,
//                 id: device._id,
//                 message: 'device created!',
//             })
//         })
//         .catch(error => {
//             return res.status(400).json({
//                 error,
//                 message: 'device not created!',
//             })
//         })

// }

async function getDevices (req, res) { 

	

	var returnedToken = await getApiToken();
	//var returnedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2FwaTIuYXJkdWluby5jYy9pb3QiLCJhenAiOiJZVkN2SDljUHN3T0h0RU02OEo3NFo5QlI0SVE2eEF3cSIsImV4cCI6MTY3NjcyMjE3MCwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwiaHR0cDovL2FyZHVpbm8uY2MvY2xpZW50X2lkIjoiSGl0aGEtY2xvdWQiLCJodHRwOi8vYXJkdWluby5jYy9pZCI6ImEzMGNkNzMzLThkYWUtNGQ4Ni1iOTk2LTE4M2QxNTE1N2EzMSIsImh0dHA6Ly9hcmR1aW5vLmNjL3JhdGVsaW1pdCI6MSwiaHR0cDovL2FyZHVpbm8uY2MvdXNlcm5hbWUiOiJyYW11a3VyYSIsImlhdCI6MTY3NjcyMTg3MCwic3ViIjoiWVZDdkg5Y1Bzd09IdEVNNjhKNzRaOUJSNElRNnhBd3FAY2xpZW50cyJ9.VtXT89NeVnMnThC19EelWCZqcgLVjbOVUWmMIE90p8c";
	//console.log("THE API TOKEN " + returnedToken)

	var defaultClient = ArduinoIotClient.ApiClient.instance;

	// Configure OAuth2 access token for authorization: oauth2
	var oauth2 = defaultClient.authentications['oauth2'];
	oauth2.accessToken = returnedToken

	var api = new ArduinoIotClient.DevicesV2Api(defaultClient);
	// var opts = {
	//   'acrossUserIds': true, // {Boolean} If true, returns all the devices
	//   //'serial': serial_example, // {String} Filter by device serial number
	//    //tags
	//   //'xOrganization': xOrganization_example // {String} 
	// };
	api.devicesV2List().then(devices => {
        console.log("Success reading all devices from iot")
        res.send(devices)
    }), error => {
	  console.error(error);
	};

	

}

// getDevicesFromCloud = () {


// }
async function showDevice (req, res) {
	try {
	var returnedToken = await getApiToken();
	var defaultClient = ArduinoIotClient.ApiClient.instance;

	// Configure OAuth2 access token for authorization: oauth2
	var oauth2 = defaultClient.authentications['oauth2'];
	oauth2.accessToken = returnedToken

	var api = new ArduinoIotClient.DevicesV2Api(defaultClient);
	console.log("body "+JSON.stringify(req.body)); 
	if (req.body.device_id == 1) {
		console.log("Will print all devices events")
	} else {
		//var id = req.body.device_id; // {String} The id of the device
		var id = '990901ef-97e9-44c2-873d-a3df56d3f8cc'
		console.log("requested ID is " + id)
		// var opts = {
		//   'xOrganization': xOrganization_example // {String}
		// };
		
		api.devicesV2Show(id).then(data => {
		  res.send('API called for showDevice: ' + JSON.stringify(data));
		}), error => {
		  console.error(error);
		};
	}
} catch (error) {
	console.log(error)
}
}
async function getEvent (req, res) {
	var returnedToken = await getApiToken();
	var defaultClient = ArduinoIotClient.ApiClient.instance;

	// Configure OAuth2 access token for authorization: oauth2
	var oauth2 = defaultClient.authentications['oauth2'];
	oauth2.accessToken = returnedToken

	var api = new ArduinoIotClient.DevicesV2Api(defaultClient);
	console.log("body "+JSON.stringify(req.body)); 
	if (req.body.device_id == 1) {
		console.log("Will print all devices events")
	} else {
		var id = req.body.device_id; // {String} The id of the device
		console.log("requested ID is " + id)
		// var opts = {
		//   'limit': 56, // {Integer} The number of events to select
		//   'start': start_example, // {String} The time at which to start selecting events
		//   'xOrganization': xOrganization_example // {String} 
		// };
		
		api.devicesV2GetEvents(id).then(data => {
		  res.send(data);
		}), error => {
		  console.error(error);
		};
	}
}

async function getProperties (req, res) {
	var returnedToken = await getApiToken();
	var defaultClient = ArduinoIotClient.ApiClient.instance;

	// Configure OAuth2 access token for authorization: oauth2
	var oauth2 = defaultClient.authentications['oauth2'];
	oauth2.accessToken = returnedToken

	var api = new ArduinoIotClient.DevicesV2Api(defaultClient);
	console.log("body "+JSON.stringify(req.device_id)); 
	if (req.query.device_id == 1) {
		console.log("Will print all devices events")
	} else {
		var id = req.query.device_id; // {String} The id of the device
		console.log("requested ID is " + JSON.stringify(req.query.device_id))
		// var opts = {
		// 'showDeleted': true, // {Boolean} If true, shows the soft deleted properties
		//   'xOrganization': xOrganization_example // {String}  
		// };
		
		api.devicesV2GetProperties(id).then(data => {

		  res.send(data);
		}), error => {
		  console.error(error);
		};
	}
}

//function retrieves each property like gps, acc etc
//here, gps id is hardcoded
async function propertiesShow (req, res) {
	var returnedToken = await getApiToken();
	var defaultClient = ArduinoIotClient.ApiClient.instance;

	// Configure OAuth2 access token for authorization: oauth2
	var oauth2 = defaultClient.authentications['oauth2'];
	oauth2.accessToken = returnedToken

	var api = new ArduinoIotClient.PropertiesV2Api(defaultClient);
	var id = req.query.device_id;	
	var pid = req.query.pid; // id of gps
	
	if (req.query.device_id == 1) {
		console.log("Will print all devices events")
	} else {
		 // {String} The id of the device
		console.log("requested ID is " + id)
		// var opts = {
		//'showDeleted': true // {Boolean} If true, shows the soft deleted properties  
		// };
		
		api.propertiesV2Show(id, pid).then(data => {
			const device2 = new Device2({
				deviceId: id,
				deviceType: "Mobile device",
				events: {"name": data.name,
						"last_value": data.last_value}
			});
				device2
			        .save({ suppressWarning: true })
			        .catch(error => {
			            console.log("Error in propertiesShow()")
			        })
			networkAPI();
		  res.send(data);

		}), error => {
		  console.error(error);
		};
	}
}

//function retrieves location data and decides to adjust bandwidth (QoS) by invoking 5g NEF API
//APIs are 3gpp standard based
//APIs to call - 
//function to be called and used by client
function networkAPI() {

	Device2.find().exec(function(data) {

		console.log("Retrieved from mongo " + JSON.stringify(data));
	})
}

async function getApiToken() {
	try {
	var rp = require('request-promise');
    var ArduinoIotClient = require('@arduino/arduino-iot-client');
    var client = ArduinoIotClient.ApiClient.instance;


    var options = {
        method: 'POST',
        url: 'https://api2.arduino.cc/iot/v1/clients/token',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        json: true,
        form: {
            grant_type: 'client_credentials',
            client_id: 'YVCvH9cPswOHtEM68J74Z9BR4IQ6xAwq',
            client_secret: '7LxsJ5ywTVXeZD0x49YlRUj5Dz1pSTFHbR7HogNb2fSyj9znyXXXyEfrzs6cxD6l',
            audience: 'https://api2.arduino.cc/iot'
        }
    };
	try {
	    const response = await rp(options);
	    console.log("Access token: " + response['access_token']);
	    return response['access_token'];
	}
	catch (error) {
	    console.error("Failed getting an access token: " + error)
	}
} catch (error) {
	console.log(error)
}
}

module.exports = {
    createDevice, 
    getDevices,
    getEvent,
    showDevice,
    getProperties,
    propertiesShow,
    deleteDevice
}
const express = require('express')

const DeviceCtrl = require('../controller/device-ctrl')

const router = express.Router()

router.post('/device', DeviceCtrl.createDevice)
router.post('/deleteDevice', DeviceCtrl.deleteDevice)
//router.put('/device/:id', DeviceCtrl.updateDevice)
//router.delete('/device/:id', DeviceCtrl.deleteDevice)
//router.get('/device/:id', DeviceCtrl.getDeviceById)
router.get('/getDevices', DeviceCtrl.getDevices)
router.get('/device/showDevice', DeviceCtrl.showDevice)
router.get('/device/event', DeviceCtrl.getEvent)
router.get('/device/properties', DeviceCtrl.getProperties)
router.get('/propShow', DeviceCtrl.propertiesShow)
router.get('/getLocationData', DeviceCtrl.getLocationData)
router.get('/getMedicalData',DeviceCtrl.getMedicalData)
module.exports = router;
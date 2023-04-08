const mongoose = require('mongoose');

const cameraSchema = new mongoose.Schema({
    name: String,
    description: String,
    url: String,
    networkIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CameraNetwork' }],
});

const cameraNetworkSchema = new mongoose.Schema({
    name: String,
    description: String,
    cameraIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Camera' }],
});

const Camera = mongoose.model('Camera', cameraSchema);
const CameraNetwork = mongoose.model('CameraNetwork', cameraNetworkSchema);

module.exports = { Camera, CameraNetwork };

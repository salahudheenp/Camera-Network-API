const { Camera, CameraNetwork } = require('../models/cameraModels')

// get all cameras
const getCameras = async (req, res) => {
    const cameras = await Camera.find()
    res.json(cameras)
}

// add camera 
const addCamera = async (req, res) => {
    const { name, description, url } = req.body;
    const camera = await Camera.create({ name, description, url });
    res.json(camera)
}

// get camera details
const getCameraDetails = async (req, res) => {
    const { id } = req.params.id
    const camera = await Camera.findById(id)
    res.json(camera)


}

// update camera 
const updateCamera = async (req, res) => {
    const { id } = req.params
    const { name, description, url } = req.body
    const camera = await Camera.findByIdAndUpdate(id, { name, description, url }, { new: true });
    res.json(camera);
}

const deleteCamera = async (req, res) => {
    const { id } = req.params;
    const camera = await Camera.findByIdAndDelete(id);

    // Remove the camera ID from all networks that it belongs to
    await CameraNetwork.updateMany({ cameraIds: id }, { $pull: { cameraIds: id } });

    res.json(camera);
}


module.exports = { getCameras, addCamera, getCameraDetails, updateCamera, deleteCamera }
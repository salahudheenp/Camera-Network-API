const { Camera, CameraNetwork } = require('../models/cameraModels')


// get networks
const getNetworks = async (req, res) => {
    const networks = await CameraNetwork.find()
    res.json(networks)

}

// add networks
const addNetworks = async (req, res) => {
    const { name, description, cameraIds } = req.body;
    const network = await CameraNetwork.create({ name, description, cameraIds });

    // Update the camera networkIds with the newly created network ID
    await Camera.updateMany({ _id: { $in: cameraIds } }, { $push: { networkIds: network._id } });

    res.json(network);

}

// get single network details
const getNetworkDetails = async (req, res) => {
    const { id } = req.params;
    const network = await CameraNetwork.findById(id).populate('cameraIds');
    res.json(network);

}


// edit networks details 
const editNetworks = async (req, res) => {
    const { id } = req.params;
    const { name, description, cameraIds } = req.body;

    try {
        // Find the old network and its cameraIds
        const oldNetwork = await CameraNetwork.findById(id).populate('cameraIds');
        const oldCameraIds = oldNetwork.cameraIds.map(camera => camera._id);

        // Find the new cameras to add and remove
        const camerasToAdd = cameraIds.filter(cameraId => !oldCameraIds.includes(cameraId));
        const camerasToRemove = oldCameraIds.filter(cameraId => !cameraIds.includes(cameraId));

        // Update the network with the new data
        const updatedNetwork = await CameraNetwork.findByIdAndUpdate(
            id,
            { name, description, cameraIds },
            { new: true }
        ).populate('cameraIds');

        // Add the new cameras to the network
        await Promise.all(
            camerasToAdd.map(cameraId =>
                CameraNetwork.findByIdAndUpdate(id, { $addToSet: { cameraIds: cameraId } })
            )
        );

        // Remove the old cameras from the network
        await Promise.all(
            camerasToRemove.map(cameraId =>
                CameraNetwork.findByIdAndUpdate(id, { $pull: { cameraIds: cameraId } })
            )
        );

        res.json(updatedNetwork);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}


const deleteNetworks = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the network and its cameras to remove
        const network = await CameraNetwork.findById(id).populate('cameraIds');
        const cameraIdsToRemove = network.cameraIds.map(camera => camera._id);

        // Remove the network
        await CameraNetwork.findByIdAndDelete(id);

        // Remove the network from each camera's networks array
        await Promise.all(
            cameraIdsToRemove.map(cameraId =>
                Camera.findByIdAndUpdate(cameraId, { $pull: { networks: id } })
            )
        );

        res.sendStatus(204); // 204 No Content
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}



module.exports = { getNetworks, editNetworks, addNetworks, getNetworkDetails, deleteNetworks }
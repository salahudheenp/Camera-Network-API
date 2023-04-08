const express = require('express')
const cameraController = require('../controllers/cameraController')


// router object
const router = express.Router()


// camera || get
router.get('/cameras', cameraController.getCameras)

// add Camera || post
router.post('/cameras', cameraController.addCamera)

// get Single camera details || get 
router.get('/cameras/:id', cameraController.getCameraDetails)

// edit camera details || put
router.put('/cameras/:id', cameraController.updateCamera)

// delete camera || delete
router.delete('/cameras/:id', cameraController.deleteCamera)



module.exports = router;
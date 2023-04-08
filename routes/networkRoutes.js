const express = require('express')
const networkController = require('../controllers/networkController')

const router = express.Router()

// get networks || get
router.get('/networks', networkController.getNetworks)


// add networks || post
router.post('/networks', networkController.addNetworks)

// gt network details || get
router.get('/networks/:id', networkController.getNetworkDetails)


// edit networks || put
router.put('/networks/:id', networkController.editNetworks)

// delete networks || delete
router.delete('/networks/:id', networkController.deleteNetworks)





module.exports = router;
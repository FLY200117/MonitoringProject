const express = require('express')
const userExpCtrl = require('../controller/userExp')
const router = express.Router()

// router.get('/:errorMesId',errorMesCtrl.get)

// router.get('/',errorMesCtrl.getAll)

router.put('/',userExpCtrl.put)

module.exports = router
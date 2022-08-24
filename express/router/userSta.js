const express = require('express')
// const errorMesCtrl = require('../controller/errorMes')
const testCtrl = require('../controller/test')
const router = express.Router()

// router.get('/:errorMesId',errorMesCtrl.get)

// router.get('/',errorMesCtrl.getAll)

// router.put('/',errorMesCtrl.put)

router.post('/',testCtrl.post)

module.exports = router
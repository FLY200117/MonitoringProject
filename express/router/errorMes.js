const express = require('express')
const errorMesCtrl = require('../controller/errorMes')
const testCtrl = require('../controller/test')
const router = express.Router()

router.get('/:errorType',errorMesCtrl.get)

router.get('/',errorMesCtrl.getAll)

router.post('/',errorMesCtrl.put)

module.exports = router
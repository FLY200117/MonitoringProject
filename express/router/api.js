const express = require('express')
// const errorMesCtrl = require('../controller/api')
const apiCtrl = require('../controller/api')
const testCtrl = require('../controller/test')
const router = express.Router()

// router.get('/:errorMesId',errorMesCtrl.get)

// router.get('/',errorMesCtrl.getAll)

router.put('/',apiCtrl.put)

router.post('/',testCtrl.post)

module.exports = router
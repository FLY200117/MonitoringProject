const express = require('express')
const testCrud = require('../controller/test')
const router = express.Router()



router.post('/test',testCrud.post)

router.get('/test',testCrud.get)

router.put('/test',testCrud.Create)

router.delete('/test',testCrud.Delete)

module.exports = router
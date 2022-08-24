const express = require('express')
const router = express.Router()

router.use(require('./test'))

router.use('/stability',require('./errorMes'))

router.use('/api',require('./api'))

router.use('/experience',require('./userExp'))

// router.use('/userSta',require('./userSta'))

module.exports = router
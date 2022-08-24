const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const router = require('./router')
const errorHandler = require('./middleware/error-handler')
const app = express()
const port = process.env.PORT || 4000

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

app.use('/',router)

app.use(errorHandler())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
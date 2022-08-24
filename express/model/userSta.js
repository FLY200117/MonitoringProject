const mongoose = require('mongoose')
const baseModel = require('./base-model')

const userStatistics = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    ...baseModel
})

module.exports = userStatistics
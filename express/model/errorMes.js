const mongoose = require('mongoose')
const baseModel = require('./base-model')

const errorMessageSchema = new mongoose.Schema({
    log: {
        type: Object,
        required: true
    },
    type: {
        type: String,
        require: true
    },
    ...baseModel
})

module.exports = errorMessageSchema
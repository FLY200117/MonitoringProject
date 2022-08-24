const mongoose = require('mongoose')
const baseModel = require('./base-model')


const testSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    ...baseModel
})

module.exports = testSchema


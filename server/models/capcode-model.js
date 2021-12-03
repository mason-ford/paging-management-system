const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Capcode = new Schema(
    {
        name: { type: String, required: true },
		capcode: { type: Number, required: true, unique: true },
        type: { type: Number, required: true },
		tone1: { type: String, required: true },
		tone2: { type: String },
        TTDexport: { type: Boolean },
    }
)

module.exports = mongoose.model('capcodes', Capcode)
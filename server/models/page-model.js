const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Page = new Schema(
    {
        capcodeId: { type: Schema.Types.ObjectId },
		capcode: { type: Number, required: true },
        recordingPath: { type: String, required: true },
		time: { type: Date, required: true }
    },
    { timestamps: true },
)

module.exports = mongoose.model('pages', Page)
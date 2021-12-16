const Capcode = require('../models/capcode-model')
const TTD = require('../twotonedetect/export')
const fs = require('fs').promises

createCapcode = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(409).json({
            success: false,
            error: 'You must provide a capcode',
        })
    }

    const capcode = new Capcode(body)

    if (!capcode) {
        return res.status(409).json({ success: false, error: err })
    }

    if (capcode.type === 1) capcode.tone2 = ""

    capcode
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: capcode._id,
                message: 'Capcode created!',
            })
        })
        .catch(error => {
            return res.status(409).json({
                error,
                message: 'Capcode not created!',
            })
        })
}

updateCapcode = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Capcode.findOne({ _id: req.params.id }, (err, capcode) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Capcode not found!',
            })
        }
        capcode.name = body.name
        capcode.capcode = body.capcode
        capcode.TTDexport = body.TTDexport
        capcode.type = body.type
        capcode.tone1 = body.tone1
        capcode.tone2 = body.tone2
        capcode.securityCode = body.securityCode

        if (capcode.type === 1) capcode.tone2 = ""

        capcode
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: capcode._id,
                    message: 'Capcode updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Capcode not updated!',
                })
            })
    })
}

deleteCapcode = async (req, res) => {
    await Capcode.findOneAndDelete({ _id: req.params.id })
        .then(capcode => {
            if (!capcode) {
                return res
                    .status(404)
                    .json({ success: false, error: `Capcode not found` })
            }
            return res.status(200).json({ success: true, data: capcode })
        })
        .catch(err => {
            console.log(err)
            return res.status(400).json({ success: false, error: err })
        })
}

getCapcodeById = async (req, res) => {
    await Capcode.findOne({ _id: req.params.id })
        .then(capcode => {
            if (!capcode) {
                return res
                    .status(404)
                    .json({ success: false, error: `Capcode not found` })
            }
            return res.status(200).json({ success: true, data: capcode })
        })
        .catch(err => {
            console.log(err)
            return res.status(400).json({ success: false, error: err })
        })
}

getCapcodes = async (req, res) => {
    await Capcode.find().sort( {capcode: 1 })
        .then(capcodes => {
            if (!capcodes.length) {
                return res
                    .status(404)
                    .json({ success: false, error: `Capcodes not found` })
            }
            return res.status(200).json({ success: true, data: capcodes })
        })
        .catch(err => {
            console.log(err)
            return res.status(400).json({ success: false, error: err })
        })
}

exportTTD = async (req, res) => {
    await Capcode.find({ TTDexport: true })
        .then(capcodes => {
            if (!capcodes.length) {
                return res
                    .status(404)
                    .json({ success: false, error: `Capcodes not found` })
            }
            fs.writeFile('./TwoToneDetect71/tones.cfg', TTD.TTDexport(capcodes))
            return res.status(200).json({ success: true })
        })
        .catch(err => {
            console.log(err)
            return res.status(400).json({ success: false, error: err })
        })
}

module.exports = {
    createCapcode,
    updateCapcode,
    deleteCapcode,
    getCapcodes,
    getCapcodeById,
    exportTTD,
}
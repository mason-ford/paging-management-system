const Page = require('../models/page-model')
const CapCode = require('../models/capcode-model')

createPage = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(409).json({
            success: false,
            error: 'You must provide a page',
        })
    }

    page = new Page(body)

    if (!page) {
        return res.status(409).json({ success: false, error: err })
    }

    await CapCode
        .findOne({ capcode: page.capcode })
        .then(capcode => {
            if (capcode) {
                page.capcodeId = capcode._id
            }
        })
        .catch(err => console.log(err))

    page
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: page._id,
                message: 'Page created!',
            })
        })
        .catch(error => {
            return res.status(409).json({
                error,
                message: 'Page not created!',
            })
        })
}

/*
updatePage = async (req, res) => {
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
        capcode.type = body.type
        capcode.tone1 = body.tone1
        capcode.tone2 = body.tone2
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
*/

/*
deleteCapcode = async (req, res) => {
    await Capcode.findOneAndDelete({ _id: req.params.id }, (err, capcode) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!capcode) {
            return res
                .status(404)
                .json({ success: false, error: `Capcode not found` })
        }

        return res.status(200).json({ success: true, data: capcode })
    }).catch(err => console.log(err))
}
*/

getPageById = async (req, res) => {
    await Page.findOne({ _id: req.params.id }, (err, page) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!page) {
            return res
                .status(404)
                .json({ success: false, error: `Page not found` })
        }
        return res.status(200).json({ success: true, data: page })
    }).catch(err => console.log(err))
}

getPages = async (req, res) => {
    await Page.aggregate([
            {
                '$sort': {
                'time': -1
                }
            }, {
                '$lookup': {
                'from': 'capcodes', 
                'localField': 'capcodeId', 
                'foreignField': '_id', 
                'as': 'capcodeData'
                }
            }
        ]).
        then(pages => {
            if (!pages.length) {
                return res
                    .status(404)
                    .json({ success: false, error: `Pages not found` })
            }
            return res.status(200).json({ success: true, data: pages })
    }).catch(err => {
        console.log(err)
        return res.status(400).json({ success: false, error: err })
    })
}

module.exports = {
    createPage,
    //updateCapcode,
    //deleteCapcode,
    getPages,
    getPageById,
}
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
        ])
        .then(pages => {
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

getPagesCount = async(req, res) => {
    await Page.aggregate([
        {
            '$facet': {
                'total': [
                {
                    '$count': 'total'
                }
                ], 
                '1year': [
                {
                    '$match': {
                    'time': {
                        '$gte': new Date(new Date() - 1000 * 3600 * 24 * 365)
                    }
                    }
                }, {
                    '$count': '1year'
                }
                ], 
                '180day': [
                {
                    '$match': {
                    'time': {
                        '$gte': new Date(new Date() - 1000 * 3600 * 24 * 180)
                    }
                    }
                }, {
                    '$count': '180day'
                }
                ], 
                '30day': [
                {
                    '$match': {
                    'time': {
                        '$gte': new Date(new Date() - 1000 * 3600 * 24 * 30)
                    }
                    }
                }, {
                    '$count': '30day'
                }
                ], 
                '7day': [
                {
                    '$match': {
                    'time': {
                        '$gte': new Date(new Date() - 1000 * 3600 * 24 * 7)
                    }
                    }
                }, {
                    '$count': '7day'
                }
                ], 
                '24hour': [
                {
                    '$match': {
                    'time': {
                        '$gte': new Date(new Date() - 1000 * 3600 * 24)
                    }
                    }
                }, {
                    '$count': '24hour'
                }
                ], 
                '1hour': [
                {
                    '$match': {
                    'time': {
                        '$gte': new Date(new Date() - 1000 * 3600 * 1)
                    }
                    }
                }, {
                    '$count': '1hour'
                }
                ]
            }
            }, {
            '$project': {
                'total': {
                '$arrayElemAt': [
                    '$total.total', 0
                ]
                }, 
                '1year': {
                '$arrayElemAt': [
                    '$1year.1year', 0
                ]
                }, 
                '180day': {
                '$arrayElemAt': [
                    '$180day.180day', 0
                ]
                }, 
                '30day': {
                '$arrayElemAt': [
                    '$30day.30day', 0
                ]
                }, 
                '7day': {
                '$arrayElemAt': [
                    '$7day.7day', 0
                ]
                }, 
                '24hour': {
                '$arrayElemAt': [
                    '$24hour.24hour', 0
                ]
                }, 
                '1hour': {
                '$arrayElemAt': [
                    '$1hour.1hour', 0
                ]
                }
            }
            }
        ])
        .then(count => {
            if (!count.length) {
                return res
                    .status(404)
                    .json({ success: false, error: `Count error` })
            }
            return res.status(200).json({ success: true, data: count[0] })
    }).catch(err => {
        console.log(err)
        return res.status(400).json({ success: false, error: err })
    })
}

module.exports = {
    createPage,
    getPages,
    getPageById,
    getPagesCount,
}
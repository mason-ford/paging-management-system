const express = require('express')

const PageCtrl = require('../controllers/page-ctrl')

const router = express.Router()

router.post('/page', PageCtrl.createPage)
//router.put('/capcode/:id', CapcodeCtrl.updateCapcode)
//router.delete('/capcode/:id', CapcodeCtrl.deleteCapcode)
router.get('/page/:id', PageCtrl.getPageById)
router.get('/pages', PageCtrl.getPages)

module.exports = router
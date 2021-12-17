const express = require('express')

const PageCtrl = require('../controllers/page-ctrl')

const router = express.Router()

router.post('/page', PageCtrl.createPage)
router.get('/page/:id', PageCtrl.getPageById)
router.get('/pages', PageCtrl.getPages)
router.get('/pages/count', PageCtrl.getPagesCount)

module.exports = router
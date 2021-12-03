const express = require('express')

const CapcodeCtrl = require('../controllers/capcode-ctrl')

const router = express.Router()

router.post('/capcode', CapcodeCtrl.createCapcode)
router.put('/capcode/:id', CapcodeCtrl.updateCapcode)
router.delete('/capcode/:id', CapcodeCtrl.deleteCapcode)
router.get('/capcode/:id', CapcodeCtrl.getCapcodeById)
router.get('/capcodes/export', CapcodeCtrl.exportTTD)
router.get('/capcodes', CapcodeCtrl.getCapcodes)

module.exports = router
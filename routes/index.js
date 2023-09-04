const {Router} = require('express')
const router = new Router()
const fileRouter = require('./fileRouter.js')

router.use('/file', fileRouter)

module.exports = router

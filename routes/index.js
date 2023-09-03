const {Router} = require('express')
const router = new Router()
const imageRouter = require('./imageRouter.js')

router.use('/image', imageRouter)

module.exports = router

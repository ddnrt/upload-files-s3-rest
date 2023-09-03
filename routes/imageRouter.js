const {Router} = require('express')
const router = new Router()
const ImageController = require("../controllers/imageController")
const roleMiddleware = require("../middleware/roleMiddleware")
const upload = require("../config/multer.config")


router.post('/', upload.array('photo', 10), roleMiddleware("ADMIN"), ImageController.upload);
router.delete('/', roleMiddleware("ADMIN"), ImageController.delete);

module.exports = router


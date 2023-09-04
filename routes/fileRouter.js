const {Router} = require('express')
const router = new Router()
const FileController = require("../controllers/fileController")
const roleMiddleware = require("../middleware/roleMiddleware")
const upload = require("../config/multer.config")


router.post('/', upload.array('files', 10), roleMiddleware("ADMIN"), FileController.upload);
router.delete('/', roleMiddleware("ADMIN"), FileController.delete);

module.exports = router


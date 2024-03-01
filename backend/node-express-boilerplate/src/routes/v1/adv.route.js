const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const AdvValidation = require('../../validations/adv.validation');
const AdvController = require('../../controllers/adv.controller');
const { upload } = require('../../shared/FileUpload');

const router = express.Router()

router.route('/upload').post(upload.array() , AdvController.uploadImage)

router
    .route('/')
    .post(upload.array("Bannerimage")  , AdvController.uploadImage)
    .get(validate(AdvValidation.getAdvs) , AdvController.getAdvs)


router
    .route('/:advId')
    .get(validate(AdvValidation.getAdv) , AdvController.getAdv)
    .patch(validate(AdvValidation.updateAdv) , AdvController.updateAdv)
    .delete(validate(AdvValidation.deleteAdv) , AdvController.deleteAdv)

module.exports = router;
const express = require('express');
// const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const providerValidation = require('../../validations/provider.validation');
const providerController = require('../../controllers/provider.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(providerValidation.createProvider), providerController.createProvider)
  .get(validate(providerValidation.getProviders), providerController.getProviders);

router
  .route('/:providerId')
  .get(validate(providerValidation.getProvider), providerController.getProvider)
  .patch(validate(providerValidation.updateProvider), providerController.updateProvider)
  .delete(validate(providerValidation.deleteProvider), providerController.deleteProvider);

module.exports = router;


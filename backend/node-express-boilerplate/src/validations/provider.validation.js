const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createProvider = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    gender:Joi.boolean().required(),
    phone:Joi.number().required(),
    image:Joi.string().required()
    // role: Joi.string().required().valid('user', 'admin'),
  }),
};

const getProviders = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getProvider = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateProvider = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1),
};

const deleteProvider = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createProvider,
  getProviders,
  getProvider,
  updateProvider,
  deleteProvider,
};

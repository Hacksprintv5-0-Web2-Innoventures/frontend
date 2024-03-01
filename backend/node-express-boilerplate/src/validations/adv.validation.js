const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createAdv = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        Bannerimage: Joi.string().required(),
        image: Joi.string(),
        Onstart: Joi.date(),
        Onend: Joi.date(),
        Isactive: Joi.boolean().required(),
    }),
};

const getAdvs = {
    query: Joi.object().keys({
        title: Joi.string(),
        description: Joi.string(),
        Bannerimage: Joi.string(),
        sortby: Joi.string(),
    }),
};

const getAdv = {
    params: Joi.object().keys({
        advId: Joi.string().custom(objectId),
    }),
};

const updateAdv = {
    params: Joi.object().keys({
        advId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            title: Joi.string(),
            description: Joi.string(),
            Bannerimage: Joi.string(),
            image: Joi.string(),
            Onstart: Joi.date(),
            Onend: Joi.date(),
            Isactive: Joi.boolean(),
        })
        .min(1),
};

const deleteAdv = {
    params: Joi.object().keys({
        advId: Joi.string().custom(objectId),
    }),
};

module.exports = {
    createAdv,
    getAdvs,
    getAdv,
    updateAdv,
    deleteAdv
  };
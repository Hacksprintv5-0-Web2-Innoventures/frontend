const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');

const advSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        Bannerimage:[
            {
                type: String,
            }
        ],
        Onstart:{
            type: Date,
            required: false,
        },
        Onend:{
            type: Date,
            required: false,
        },
        Isactive:{
            type: Boolean,
            default: true,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

// add plugin that converts mongoose to json
advSchema.plugin(toJSON);
advSchema.plugin(paginate);

advSchema.statics.isTitleTaken = async function (title, excludeUserId) {
    const user = await this.findOne({ title, _id: { $ne: excludeUserId } });
    return !!user;
  };

const Adv = mongoose.model('Adv', advSchema);

module.exports = Adv;
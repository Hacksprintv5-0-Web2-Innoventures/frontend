const { model } = require('mongoose');

module.exports.authService = require('./auth.service');
module.exports.emailService = require('./email.service');
module.exports.tokenService = require('./token.service');
module.exports.userService = require('./user.service');
module.exports.advService = require('./adv.service');
module.exports.providerService = require('./provider.service');


const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const  providerService  = require('../services/provider.service');

const createProvider = catchAsync(async (req, res) => {
  const user = await providerService.createProvider(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getProviders = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await providerService.queryProviders(filter, options);
  res.send(result);
});

const getProvider = catchAsync(async (req, res) => {
  const user = await providerService.getProviderById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateProvider = catchAsync(async (req, res) => {
  const user = await providerService.updateProviderById(req.params.userId, req.body);
  res.send(user);
});

const deleteProvider = catchAsync(async (req, res) => {
  await userService.deleteProviderById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createProvider,
  getProviders,
  getProvider,
  updateProvider,
  deleteProvider,
};

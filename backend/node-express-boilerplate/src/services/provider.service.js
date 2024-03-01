const httpStatus = require('http-status');
const { Provider } = require('../models/');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createProvider = async (providerBody) => {
  // if (await Provider.isEmailTaken(providerBody.email)) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  // }
  return Provider.create(providerBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryProviders = async (filter, options) => {
  const providers = await Provider.paginate(filter, options);
  return providers;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getProviderById = async (id) => {
  return Provider.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getProviderByEmail = async (email) => {
  return Provider.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateProviderById = async (userId, updateBody) => {
  const provider = await getProviderById(userId);
  if (!provider) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await Provider.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(provider, updateBody);
  await provider.save();
  return provider;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteProviderById = async (userId) => {
  const provider = await getProviderById(userId);
  if (!provider) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await provider.remove();
  return provider;
};

module.exports = {
  createProvider,
  queryProviders,
  getProviderById,
  getProviderByEmail,
  updateProviderById,
  deleteProviderById,
};

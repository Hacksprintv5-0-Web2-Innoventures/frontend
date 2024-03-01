const httpStatus = require('http-status');
const Adv = require('../models/adv.model');
const ApiError = require('../utils/ApiError');



/**
 * Create a user
 * @param {Object} advBody
 * @returns {Promise<User>}
 */
const createAdv = async (avdBody) =>
{
    return Adv.create(avdBody);
}

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */

const queryAvds = async (filter , options) =>
{
    const advs = await Adv.paginate(filter , options);
    return advs
}

const getAdvById = async (id) =>
{
    return Adv.findById(id);
}

 const getAdvByTitle = async (title) =>
 {
     return Adv.findone({title});
 }

const updateAdvById = async (avdId , updatebody) =>
{
    const adv = await getAdvById(avdId);
    if(!adv)
    {
        throw new ApiError(httpStatus.NOT_FOUND , "Adv Not Found");
    }
    if(updatebody.title && (await Adv.isTitleTaken(updatebody.title , avdId)))
    {
        throw new ApiError(httpStatus.BAD_REQUEST , "Title Already Taken");
    }
    Object.assign(adv , updatebody);
    await adv.save();
    return adv;
}

const deleteAdvById = async (advId) =>
{
    const adv = await getAdvById(advId);
    if(!adv)
    {
        throw new ApiError(httpStatus.NOT_FOUND , "Adv Not Found");
    }
    if(!adv.Isactive)
    {
        throw new ApiError(httpStatus.BAD_REQUEST , "Adv Already Deleted");
    }
    adv.Isactive = false;
    await adv.save();
    return adv;
}

module.exports = {
    createAdv,
    queryAvds,
    getAdvById,
    getAdvByTitle,
    updateAdvById,
    deleteAdvById
};
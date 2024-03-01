const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { advService } = require('../services');

const createAdv = catchAsync(async (req, res) => {
  const adv = await advService.createAdv(req.body);
  res.status(httpStatus.CREATED).send(adv);
});

const uploadImage = catchAsync(async (req, res) => {
  const bannerImages = req.files ? req.files.map((file) => `http://${req.headers.host}/uploads/${file.filename}`) : [];
  // const adv = await advService.createAdv(req.body);
  // console.log(adv)
  const advData = {
    ...req.body,
    Bannerimage: bannerImages,
  }
  const adv = await advService.createAdv(advData);
  res.status(httpStatus.CREATED).send(adv);
});

const getAdvs = catchAsync(async (req , res) => {
    const filter = pick(req.query , ['title' , 'description' , 'Bannerimage']);
    const options = pick(req.query , ['Onstart' , 'Onend' , 'Isactive']);
    const result = await advService.queryAvds(filter , options);
    res.send(result);
});

const getAdv = catchAsync(async (req , res) =>
{
  const adv = await advService.getAdvById(req.params.advId);
  if(!adv)
  {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(adv)
}
);

const updateAdv = catchAsync(async (req , res) =>
{
  const adv = await advService.updateAdvById(req.params.advId , req.body)
  if(!adv)
  {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  res.send(adv)
}
);

const deleteAdv = catchAsync(async (req , res) =>
{
  await advService.deleteAdvById(req.params.advId);
  res.status(httpStatus.NO_CONTENT).send();

})

module.exports = 
{
  createAdv,
  getAdvs,
  getAdv,
  updateAdv,
  deleteAdv,
  uploadImage
};
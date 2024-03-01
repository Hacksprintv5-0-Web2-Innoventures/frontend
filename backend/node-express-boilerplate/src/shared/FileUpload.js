const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // ! NOTE - when changing this please change the path in routes.js
    cb(null, './public/uploads/');
  },
  filename: (req, file, cb) => {
    const fileName = `${new Date().getTime()}--${file.originalname.toLowerCase().split(' ').join('-')}`;

    cb(null, fileName);
  },
});

const upload = multer({
  storage,
  limits: {
    files: 10,
    // First should be in MB
    fileSize: 24 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
});

module.exports = { storage, upload };

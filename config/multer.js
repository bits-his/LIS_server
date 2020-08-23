const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

 const user = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'samples/myimage',
      format: 'png', // supports promises as well
      public_id: (req, file) => file.originalname,
    },
  });
  exports.profileStorage = multer({ storage: user });
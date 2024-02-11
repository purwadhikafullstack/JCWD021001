const path = require('path')
const multer = require('multer')

const avatarStorage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, path.join(__dirname, '../public/images/avatar'))
  },
  filename: (req, file, cb) => {
    const id = req.params.id
    cb(null, `avatar_${id}-${Date.now()}-${file.originalname}`)
  },
})

const fileFilter = (req, file, cb) => {
  const fileType = file.mimetype.split('/')[1];
  if (fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg' || fileType === 'gif') {
    cb(null, true);
  } else {
    cb(new Error('File type not allowed'), false);
  }
};

const limits = {
  fileSize: 1024 * 1024,
}
const productLimits = {
  fileSize: 1024 * 1024,
}
const uploadAvatarFile = multer({
  storage: avatarStorage,
  fileFilter,
  limits,
}).single('avatar')

const productImageStorage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, path.join(__dirname, '../public/images/productImages'))
  },
  filename: (req, file, cb) => {
    cb(null, `product-${Date.now()}-${file.originalname}`)
  },
})

const uploadProductImageFile = multer({
  storage: productImageStorage,
  fileFilter,
  productLimits,
}).single('imageUrl')

module.exports = {
  uploadAvatarFile,
  uploadProductImageFile,
}

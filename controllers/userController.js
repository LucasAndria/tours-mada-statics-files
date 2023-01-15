const multer = require("multer");
const sharp = require("sharp");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Pour enregistrer les fichiers dans le mémoire
const multerStorage = multer.memoryStorage();

// Filtrer les fichiers qui ne sont pas des images
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.body.photo_name}`);

  res.status(200).json({
    status: "success",
    message: "Photo updated",
  });
});

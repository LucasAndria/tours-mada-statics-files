const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.patch(
  "/updatePhoto",
  userController.uploadUserPhoto,
  userController.resizeUserPhoto
);

module.exports = router;

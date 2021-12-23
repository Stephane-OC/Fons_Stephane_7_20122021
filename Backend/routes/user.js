const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const multer = require("../middleware/multer-config");
const auth= require("../middleware/auth");
const validEmail = require("../middleware/emailValid");


router.post("/signup", validEmail, multer, userCtrl.signup);
router.post("/login", userCtrl.login);
router.post("/", auth, userCtrl.getOne);
router.post("/getAs", auth, userCtrl.getAs);

////////////////////////////  A VENIR  ////////////////////////////

//Router put modification "PP"
//Router put modification "Account"
//Router put modification "Password"
//Router delete supression "delete"
module.exports = router;
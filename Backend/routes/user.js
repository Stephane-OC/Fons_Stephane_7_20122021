const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const multer = require("../middleware/multerProfile");
const authTokenId = require("../middleware/authUser");
const auth= require("../middleware/auth");
const validEmail = require("../middleware/emailValid");


router.post("/signup", validEmail, multer, userCtrl.signup);
router.post("/login", userCtrl.login);
router.post("/", authTokenId, userCtrl.getOne);
router.post("/getAs", authTokenId, userCtrl.getAs);
router.put("/modify/:id", authTokenId , multer, userCtrl.modifyPP);
router.put("/modifyAccount/:id", authTokenId, userCtrl.modifyAccount);
router.put("/modifyPassword/:id", authTokenId, userCtrl.modifyPassword);

router.delete("/delete/:id", userCtrl.delete);



module.exports = router;
const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const multer = require("../middleware/multer-config");
const authTokenId = require("../middleware/auth");
const auth= require("../middleware/auth");
const validEmail = require("../middleware/emailValid");


router.post("/signup", validEmail, multer, userCtrl.signup);
router.post("/login", userCtrl.login);
router.post("/", auth, userCtrl.getOne);
router.post("/getAs", auth, userCtrl.getAs);

router.put("/modifyAccount/:id", authTokenId, userCtrl.modifyAccount);
router.put("/modifyPassword/:id", authTokenId, userCtrl.modifyPassword);

router.delete("/delete/:id", authTokenId, userCtrl.delete);



module.exports = router;
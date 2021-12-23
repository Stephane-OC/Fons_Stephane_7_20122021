const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.get("/", auth, postCtrl.getAll);
router.post("/byAuthor",postCtrl.getByAuthor);

////////////////////////////  A VENIR  ////////////////////////////

//Router post "create"
//Router delete "delete"
//router put "modify"
module.exports = router;
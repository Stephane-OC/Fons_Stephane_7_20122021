const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.get("/", auth, postCtrl.getAll);

router.post("/byAuthor",postCtrl.getByAuthor);
router.post("/", auth, multer, postCtrl.create);

router.put("/:id", multer, postCtrl.modify);

router.delete("/:id", auth, postCtrl.delete);


module.exports = router;
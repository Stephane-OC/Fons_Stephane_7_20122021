const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");


router.post("/", auth, commentCtrl.create);
router.get("/:postId",auth, commentCtrl.getAll);
router.delete("/:commentId", auth, commentCtrl.delete);

module.exports = router;
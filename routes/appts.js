const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const apptsController = require("../controllers/appts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, apptsController.getPost);

router.post("/createPost", upload.single("file"), apptsController.createPost);

router.put("/likePost/:id", apptsController.likePost);

router.delete("/deletePost/:id", apptsController.deletePost);

module.exports = router;

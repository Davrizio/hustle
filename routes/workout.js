const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const workoutController = require("../controllers/workout");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, workoutController.getPost);

router.post("/createPost", upload.single("file"), workoutController.createPost);

router.put("/likePost/:id", workoutController.likePost);

router.delete("/deletePost/:id", workoutController.deletePost);

module.exports = router;

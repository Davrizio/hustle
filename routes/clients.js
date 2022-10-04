const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const clientsController = require("../controllers/clients");
const clientWorkoutController = require("../controllers/clientWorkout");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, clientsController.getPost);

router.post("/createPostClient", upload.single("file"), clientsController.createPost, clientWorkoutController.createPost);

router.put("/likePost/:id", clientsController.likePost);

router.delete("/deletePost/:id", clientsController.deletePost, clientWorkoutController.deletePost);

module.exports = router;

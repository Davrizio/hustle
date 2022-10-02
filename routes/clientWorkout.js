const express = require("express");
const router = express.Router();
const clientsController = require("../controllers/clients");
const clientWorkoutController = require("../controllers/clientWorkout");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, clientWorkoutController.getPost, clientsController.getPost);

router.post("/createPost", clientWorkoutController.createPost);

router.delete("/deletePost/:id", clientWorkoutController.deletePost);

module.exports = router;

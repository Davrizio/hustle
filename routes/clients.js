const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const clientsController = require("../controllers/clients");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, clientsController.getPost);

router.post("/createPostClient", upload.single("file"), clientsController.createPost);

router.put("/likePost/:id", clientsController.likePost);

router.delete("/deletePost/:id", clientsController.deletePost);

module.exports = router;

const cloudinary = require("../middleware/cloudinary");
const ClientExercise = require("../models/clientExercise");
const Comment = require("../models/Comment");

module.exports = {
  getWorkout: async (req, res) => {
    try {
      const posts = await PostExercise.find({ user: req.user.id });
      res.render("clientWorkout.ejs", { posts: posts, user: req.user});
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await ClientExercise.findById(req.params.id);
      const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
      res.render("clientWorkout.ejs", { post: post, user: req.user, comments: comments});
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      await ClientExercise.create({
        exercise: req.body.exercise,
        repititions: req.body.repititions,
        client: req.body.client,
        user: req.user.id,
      });
      console.log("Execise has been added to client workout!");
      res.redirect("/client");
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await PostExercise.findById({ _id: req.params.id });
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/client");
    } catch (err) {
      res.redirect("/client");
    }
  },
};

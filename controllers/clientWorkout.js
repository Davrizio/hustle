const cloudinary = require("../middleware/cloudinary");
const ClientExercise = require("../models/clientEx");
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
        instruction: req.body.instruction,
        sets: req.body.sets,
        appointment: req.body.appointment,
        client: req.body.client,
        user: req.user.id,
      });
      console.log("Execise has been added to client workout!");
      res.redirect("/appointments");
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    console.log('clientWorkout controller')
    try {
      // Find post by id
      let post = await ClientExercise.findById({ _id: req.params.id });
      // Delete post from db
      await ClientExercise.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect(`/appointments`);
    } catch (err) {
      res.redirect(`/appointments`);
    }
  },
};

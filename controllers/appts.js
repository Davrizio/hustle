const cloudinary = require("../middleware/cloudinary");
const Appts = require("../models/appts");
const Comment = require("../models/Comment");

module.exports = {
  getAppts: async (req, res) => {
    try {
      const posts = await Appts.find({ user: req.user.id });
      res.render("appointments.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Appts.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Appts.findById(req.params.id);
      const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
      res.render("appointment.ejs", { post: post, user: req.user, comments: comments });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      await Appts.create({
        date: req.body.date,
        client: req.body.client,
        likes: 0,
        user: req.user.id,
      });
      console.log("Date has been added!");
      res.redirect("/appointments");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Appts.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Appts.findById({ _id: req.params.id });
      // Delete post from db
      await Appts.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/appointments");
    } catch (err) {
      res.redirect("/appointments");
    }
  },
};

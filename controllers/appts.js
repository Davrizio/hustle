const cloudinary = require("../middleware/cloudinary");
const Appts = require("../models/appts");
const ClientList = require("../models/clients");
const Exercise = require("../models/Post");
const Comment = require("../models/Comment");
const clientPost = require("../models/clientEx");

module.exports = {
  getAppts: async (req, res) => {
    try {
      const posts = await Appts.find({ user: req.user.id });
      const clientList = await ClientList.find({ user: req.user.id });
      res.render("appointments.ejs", { posts: posts, user: req.user, clientList: clientList });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const apptPost = await Appts.findById(req.params.id);
      const post = await ClientList.findById(req.params.id);
      const elist = await Exercise.find({ user: req.user.id });
      const cworkout = await clientPost.find({ user: req.user.id });
      const clientList = await ClientList.find({ user: req.user.id });
      const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
      res.render("appointment.ejs", { apptPost: apptPost, user: req.user, comments: comments, elist: elist, cworkout: cworkout, post: post, clientList: clientList });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      await Appts.create({
        date: req.body.date,
        client: req.body.client,
        user: req.user.id,
      });
      console.log("Date has been added!");
      res.redirect("/appointments");
    } catch (err) {
      console.log(err);
    }
  },
  editPost: async (req, res) => {
    try {
      await Appts.findOneAndUpdate(
        { _id: req.params.id },
        {
          date: req.body.editDate,
          client: req.body.editClient,
        }
      );
      console.log("Date Edited!");
      res.redirect("/appointments");
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

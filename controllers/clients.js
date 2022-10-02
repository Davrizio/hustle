const cloudinary = require("../middleware/cloudinary");
const Client = require("../models/clients");
const Exercise = require("../models/Post");
const Comment = require("../models/Comment");
const clientPost = require("../models/clientExercise");


module.exports = {
  getClient: async (req, res) => {
    try {
      const posts = await Client.find({ user: req.user.id });
      const elist = await Exercise.find({ user: req.user.id });
      res.render("clients.ejs", { posts: posts, user: req.user, elist: elist });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Client.findById(req.params.id);
      const elist = await Exercise.find({ user: req.user.id });
      const cworkout = await clientPost.find({ user: req.user.id });
      const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
      res.render("client.ejs", { post: post, user: req.user, comments: comments, elist: elist, cworkout: cworkout});
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    console.log('you are here')
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      await Client.create({
        name: req.body.name,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        address: req.body.address,
        phone: req.body.phone,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/clients");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
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
      let post = await Client.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Client.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/clients");
    } catch (err) {
      res.redirect("/clients");
    }
  },
};

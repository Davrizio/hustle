const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.body.appointmentid,
      });
      console.log("Comment has been added!");
      res.redirect("/appointments");
    } catch (err) {
      console.log(err);
    }
  },
};

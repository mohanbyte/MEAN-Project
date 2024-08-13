const express = require("express");
const router = express.Router();

const Post = require("../models/host");
const mongoose = require("mongoose");
const multer = require("multer");

const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpg",
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    console.log(file, "____file___");

    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

router.post(
  "",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");

    const post = new Post({
      title: req.body.title,
      content: req.body.title,
      imagePath: url + "/images/" + req.file.filename,
    });
    post.save().then((createdPost) => {
      //will return added object.
      console.log(post);
      res.status(201).json({
        message: "Post added successfully",
        post: {
          ...createdPost,
          id: createdPost._id,
        },
      });
    });
  }
);

router.get("", (req, res, next) => {
  Post.find().then((documents) => {
    console.log(documents);
    posts = documents;
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: posts,
    });
  });
});
router.delete("/:id", (req, res, next) => {
  console.log(res, "delete request");
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post Deleted" });
  });
});
module.exports = router;

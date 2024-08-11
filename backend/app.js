const express = require("express");
const bodyParser = require("body-parser");
const Post = require("./models/host.js");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect(
    "mongodb+srv://mohan:PmxOIHXdPVXJ1WXq@cluster0.cscwhhu.mongodb.net/backfront?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => [console.log("Connection Failed!")]);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.title,
  });
  post.save().then((result) => {
    //will return added object.
    console.log(post);
    res.status(201).json({
      message: "Post added successfully",
    });
  });
});

app.get("/api/posts", (req, res, next) => {
  Post.find().then((documents) => {
    console.log(documents);
    posts = documents;
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: posts,
    });
  });
});
app.delete("/api/posts/:id", (req, res, next) => {
  console.log(res, "delete request");
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post Deleted" });
  });
});

module.exports = app;

const mongoose = require("mongoose");
const postMongoose = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, default: "This is a content" },
  imagePath: { type: String, required: true },
});
module.exports = mongoose.model("Post", postMongoose); //Name , schema : models name plural of schema name

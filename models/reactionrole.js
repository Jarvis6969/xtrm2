const { Schema, model } = require("mongoose");
module.exports = model(
  "reactionrole",
  new Schema({
    Guild: String,
    MessageID: String,
    Reaction: String,
    Role: String,
  })
);

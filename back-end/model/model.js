const mongoose = require("mongoose");
const PublishingSchema = new mongoose.Schema({
  publishing: {
    type: "string",
  },
  address: {
    type: "string",
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});
const BookSchema = new mongoose.Schema({
  name: {
    type: "string",
  },
  price: {
    type: "number",
  },
  number: {
    type: "number",
  },
  year: {
    type: "String",
  },
  author: {
    type: "string",
  },
  img: {
    type: "string",
  },

  publishing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Publishing",
  },
});
let Publishing = mongoose.model("Publishing", PublishingSchema);
let Book = mongoose.model("Book", BookSchema);
module.exports = { Book, Publishing };

const mongoose = require("mongoose");
const BorrowBookSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  namebook: {
    type: String,
  },
  birth: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  dateborrow: {
    type: String,
  },
  datereturn: {
    type: String,
  },
});
module.exports = mongoose.model("borrow", BorrowBookSchema);

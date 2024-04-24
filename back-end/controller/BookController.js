const { Book, Publishing } = require("../model/model");
const bookController = {
  addABook: async (req, res) => {
    try {
      const newBook = new Book(req.body);
      const saveBook = await newBook.save();
      if (req.body.publishing) {
        const publishing = Publishing.findById(req.body.publishing);
        await publishing.updateOne({ $push: { books: saveBook._id } });
      }
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
  // GET ALL BOOKs
  getAllBooks: async (req, res) => {
    try {
      const allBooks = await Book.find().populate("publishing");
      res.status(200).json(allBooks);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
  getABook: async (req, res) => {
    try {
      const abook = await Book.findById(req.params.id).populate("publishing");
      res.status(200).json(abook);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
  updateBook: async (req, res) => {
    try {
      const updateBook = await Book.findById(req.params.id);
      await updateBook.updateOne({ $set: req.body });
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
  deteleBook: async (req, res) => {
    try {
      await Publishing.updateMany(
        { books: req.params.id },
        { $pull: { books: req.params.id } }
      );
      await Book.findByIdAndDelete(req.params.id);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
};
module.exports = bookController;

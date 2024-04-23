const { Book, Publishing } = require("../model/model");
const PublishingController = {
  // ADD NXB
  addPublishing: async (req, res) => {
    try {
      const newPublishing = new Publishing(req.body);
      const savePublishing = await newPublishing.save();
      res.status(200).json(savePublishing);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
  // Get All Publishings
  getAllPublishing: async (req, res) => {
    try {
      const Publishings = await Publishing.find();
      res.status(200).json(Publishings);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
  getAnPublishing: async (req, res) => {
    try {
      const publishing = await Publishing.findById(req.params.id).populate(
        "books"
      );
      res.status(200).json(publishing);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
  updatePublishing: async (req, res) => {
    try {
      const updatePublishing = await Publishing.findById(req.params.id);
      await updatePublishing.updateOne({ $set: req.body });
      res.status(200).json(updatePublishing);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
  deletePublishing: async (req, res) => {
    try {
      await Book.updateMany(
        { publishing: req.params.id },
        { publishing: null }
      );
      await Publishing.findByIdAndDelete(req.params.id);
      res.status(200).json("deleted");
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
};
module.exports = PublishingController;

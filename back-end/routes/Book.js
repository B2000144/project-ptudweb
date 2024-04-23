const router = require("express").Router();
const BookController = require("../controller/BookController");
// Add a Book
router.post("/", BookController.addABook);
router.get("/", BookController.getAllBooks);
router.get("/:id", BookController.getABook);
router.put("/:id", BookController.updateBook);
router.delete("/:id", BookController.deteleBook);
module.exports = router;

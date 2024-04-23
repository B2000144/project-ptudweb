const router = require("express").Router();
const PublishingController = require("../controller/PublishingController");
// ADD Publish
router.post("/", PublishingController.addPublishing);
// GET ALL Publish
router.get("/", PublishingController.getAllPublishing);
router.get("/:id", PublishingController.getAnPublishing);
router.put("/:id", PublishingController.updatePublishing);
router.delete("/:id", PublishingController.deletePublishing);
module.exports = router;

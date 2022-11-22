const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router({ mergeParams: true });
const { getNote, addNote } = require("../controllers/noteController");

router.route("/").get(protect, getNote).post(protect, addNote);

module.exports = router;

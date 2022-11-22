// const { Router } = require("express");
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getTickets,
  getTicket,
  createTickets,
  deleteTicket,
  updateTicket
} = require("../controllers/ticketController");

router.route("/").get(protect, getTickets).post(protect, createTickets);

// Re-route into note router
const noteRoute = require("./noteRoute");
router.use("./:ticketId/notes", noteRoute);

router
  .route("/:id")
  .get(protect, getTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket);

module.exports = router;

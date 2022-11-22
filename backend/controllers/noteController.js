const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");
const noteModel = require("../models/noteModel");
const Ticket = require("../models/ticketModel");

// @desc get notes for a ticket
// @route Get /api/tickets/:ticketId/notes
// @access private

const getNote = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const notes = await Note.find({ ticket: req.params.ticketId });

  res.status(200).json(notes);
});

// @desc Create a note
// @route Post /api/tickets/:ticketId/notes
// @access private

const addNote = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    ticket: req.params.ticketId,
    user: req.user.id
  });

  res.status(200).json(note);
});
module.exports = {
  getNote,
  addNote
};

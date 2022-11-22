const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");
const Ticket = require("../models/ticketModel");

// @desc User ticket
// @route Get /api/tickets
// @access private

const getTickets = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const tickets = await Ticket.find({ User: req.user.id });
  // res.status(200).json({ message: "Get tickets" });
  res.status(200).json(tickets);
});

// @desc User ticket
// @route Get /api/tickets/:id
// @access private

const getTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() == !req.user.id) {
    res.status(401);
    throw new Error("Not authorised");
  }
  res.status(200).json(ticket);
});

// @desc Create tickets
// @route Post /api/tickets
// @access private

const createTickets = asyncHandler(async (req, res) => {
  // res.send("Here I am");
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error("Please add a product and description");
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const ticket = await Ticket.create({
    description,
    product,
    status: "new",
    user: req.user.id
  });

  res.status(201).json({ message: "Create tickets" });
});

// @desc delete ticket
// @route DELETE /api/tickets/:id
// @access private

const deleteTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket");
  }

  if (ticket.user.toString() === !res.user.id) {
    res.status(401);
    throw new Error("Not authorised");
  }

  await ticket.remove();

  res.status(200).json({ success: true });
});

// @desc Update ticket
// @route PUT /api/tickets/:id
// @access private

const updateTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket");
  }

  if (ticket.user.toString() === !res.user.id) {
    res.status(401);
    throw new Error("Not authorised");
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(ticket);
});

module.exports = {
  getTickets,
  getTicket,
  createTickets,
  updateTicket,
  deleteTicket
};

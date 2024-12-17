const express = require("express");
const router = express.Router();
const ticketsController = require("../controllers/ticketsController");
const authController = require("../controllers/authController");
router.post(
  "/book-ticket",
  authController.verifyToken,
  ticketsController.bookTicket
);
router.get("/:ticket_id", ticketsController.getTicketByTicketId);
module.exports = router;

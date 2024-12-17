const express = require("express");
const router = express.Router();
const ticketsController = require("../controllers/ticketsController");
router.post("/book-ticket", ticketsController.bookTicket);

module.exports = router;

const db = require("../config/db");

const Ticket = {
  // Hàm tạo nhiều vé cùng lúc
  createMultipleTickets: (ticketData, callback) => {
    const query = `
      INSERT INTO tickets (ticket_id, user_id, trip_id, seat_number, email, name, phone, status)
      VALUES ?;
    `;
    const values = ticketData.map((ticket) => [
      ticket.ticket_id,
      ticket.user_id,
      ticket.trip_id,
      ticket.seat_number,
      ticket.email,
      ticket.name,
      ticket.phone,
      ticket.status,
    ]);

    db.query(query, [values], callback);
  },

  getTicketByTicketId: (ticket_id, callback) => {
    const query = `SELECT * FROM tickets WHERE ticket_id = ?`;
    db.query(query, [ticket_id], callback);
  },
};

module.exports = Ticket;

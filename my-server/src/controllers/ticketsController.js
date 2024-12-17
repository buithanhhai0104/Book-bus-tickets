const Trip = require("../models/tripsModel");
const Ticket = require("../models/ticketsModel");
const ticketsController = {
  bookTicket: (req, res) => {
    const { ticket_id, user_id, trip_id, seat_numbers, email, name, phone } =
      req.body;

    // Kiểm tra các trường bắt buộc
    if (
      !ticket_id ||
      !user_id ||
      !trip_id ||
      !Array.isArray(seat_numbers) ||
      seat_numbers.length === 0 ||
      !email ||
      !name ||
      !phone
    ) {
      return res
        .status(400)
        .json({ error: "Missing required fields or invalid seat numbers." });
    }

    // Kiểm tra nếu chuyến đi tồn tại
    Trip.getTripById(trip_id, (err, results) => {
      if (err) return res.status(500).json({ error: "Failed to check trip." });
      if (results.length === 0) {
        return res.status(404).json({ message: "Trip not found" });
      }

      // Kiểm tra trạng thái của ghế
      const trip = results[0];
      let seats;
      try {
        seats =
          typeof trip.seats === "string" ? JSON.parse(trip.seats) : trip.seats;
      } catch (e) {
        return res.status(500).json({ error: "Failed to parse seats data." });
      }
      const unavailableSeats = seat_numbers.filter((seat) => {
        return !seats.some(
          (s) => s.seat_number === seat && s.status === "available"
        );
      });

      if (unavailableSeats.length > 0) {
        return res.status(400).json({
          message: `The following seats are already taken: ${unavailableSeats.join(
            ", "
          )}`,
        });
      }

      // Cập nhật trạng thái ghế từ 'available' sang 'booked'
      seats = seats.map((seat) => {
        if (seat_numbers.includes(seat.seat_number)) {
          seat.status = "booked"; // Đánh dấu ghế là đã đặt
        }
        return seat;
      });

      // Cập nhật lại thông tin ghế trong chuyến đi
      Trip.updateTripSeats(trip_id, seats, (err) => {
        if (err)
          return res.status(500).json({ error: "Failed to update seats." });

        const ticketData = seat_numbers.map((seat_number) => ({
          ticket_id,
          user_id,
          trip_id,
          seat_number,
          email,
          name,
          phone,
          status: "booked",
        }));

        // Lưu thông tin vé vào bảng tickets
        Ticket.createMultipleTickets(ticketData, (err, ticketResults) => {
          if (err) return res.status(500).json({ error: err.message });
          res.status(201).json({
            message: `${ticketResults.length} tickets booked successfully.`,
            ticketIds: ticketResults.map((ticket) => ticket.insertId),
          });
        });
      });
    });
  },

  getTicketByTicketId: (req, res) => {
    const { ticket_id } = req.params; // Lấy ticket_id từ URL params

    // Truy vấn vào database để tìm vé với ticket_id
    Ticket.getTicketByTicketId(ticket_id, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Ticket not found" });
      }

      // Trả về thông tin vé tìm được
      res.status(200).json(result[0]); // result[0] là vé đầu tiên tìm thấy
    });
  },
};

module.exports = ticketsController;

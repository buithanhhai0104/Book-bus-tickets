const Trip = require("../models/tripsModel");
const Ticket = require("../models/ticketsModel");
const { v4: uuidv4 } = require("uuid");
const ticketsController = {
  bookTicket: (req, res) => {
    const { user_id, trip_id, seat_numbers, email, name, phone } = req.body;

    // Kiểm tra các trường bắt buộc
    if (
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

      const trip = results[0];
      let seats;
      try {
        seats =
          typeof trip.seats === "string" ? JSON.parse(trip.seats) : trip.seats;
      } catch (e) {
        return res.status(500).json({ error: "Failed to parse seats data." });
      }

      // Kiểm tra trạng thái của ghế
      const unavailableSeats = seat_numbers.filter((seat) => {
        return !seats.some(
          (s) => s.seat_number === seat && s.status === "available"
        );
      });

      if (unavailableSeats.length > 0) {
        return res.status(400).json({
          nessage: "Ghế đã được đặt",
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

        // Tạo dữ liệu vé, mỗi ghế có một ticket_id riêng
        const ticketData = seat_numbers.map((seat_number) => ({
          ticket_id: uuidv4(), // Tạo ticket_id riêng cho mỗi vé
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

          // Trả về danh sách vé đã đặt
          res.status(201).json({
            message: "Đặt vé thành công",
            tickets: ticketData,
            updatedSeats: seats,
          });
        });
      });
    });
  },

  getTicketByTicketId: (req, res) => {
    const { ticket_id } = req.params; //
    Ticket.getTicketByTicketId(ticket_id, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Ticket not found" });
      }

      res.status(200).json(result[0]);
    });
  },
};

module.exports = ticketsController;

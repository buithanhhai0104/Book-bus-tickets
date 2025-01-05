import { IBookTicket } from "@/types/bookTickets";
import { updateTicketStatus } from "@/lib/bookTicketsService";
interface IChangeTicketStatus {
  ticket_id: string;
  status: string;
  expires_at: string | null;
}
// Hàm xử lý khi thanh toán thành công

export const handlePaymentSuccess = async (
  bookTicketsData: IBookTicket[] | null
) => {
  // Kiểm tra nếu không có dữ liệu vé
  if (!bookTicketsData || bookTicketsData.length === 0) {
    console.error("No tickets available.");
    return;
  }

  // Chuyển đổi dữ liệu vé để cập nhật trạng thái
  const changeTicketStatus: IChangeTicketStatus[] = bookTicketsData.map(
    ({ ticket_id }) => ({
      ticket_id: ticket_id || "",
      status: "Đã thanh toán",
      expires_at: null,
    })
  );

  console.log("Change ticket status:", changeTicketStatus);

  try {
    // Gửi yêu cầu cập nhật trạng thái vé
    const updatePaymentStatus = await updateTicketStatus(
      "http://localhost:4000/tickets/status", // Đảm bảo URL chính xác
      changeTicketStatus
    );

    // Xử lý kết quả trả về từ backend
    if (updatePaymentStatus) {
      console.log("Ticket status updated successfully:", updatePaymentStatus);
      return { success: true };
    } else {
      console.error("Payment update failed:", updatePaymentStatus);
      return {
        success: false,
        message: "Cập nhật trạng thái vé không thành công.",
      };
    }
  } catch (err) {
    // Xử lý lỗi nếu có
    console.error("Error updating ticket status:", err);
    return {
      success: false,
      message: "Có lỗi xảy ra khi cập nhật trạng thái vé.",
    };
  }
};

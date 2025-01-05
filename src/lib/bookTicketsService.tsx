import { IBookTicket } from "@/types/bookTickets";
import axios from "axios";

export const bookTickets = async (url: string, bookData: IBookTicket) => {
  try {
    const response = await axios.post(url, bookData, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.error("Error booking tickets:", err);
  }
};

export const checkTickets = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.log("Error check tickets", err);
  }
};

interface IChangeTicketStatus {
  ticket_id: string;
  status: string;
  expires_at: string | null;
}
interface UpdateTicketStatusResponse {
  success: boolean;
  message?: string;
}

export const updateTicketStatus = async (
  url: string,
  changeTicketStatus: IChangeTicketStatus[]
): Promise<UpdateTicketStatusResponse> => {
  try {
    const response = await axios.put(url, { changeTicketStatus });
    return response.data; // Trả về dữ liệu từ response
  } catch (err) {
    console.error("Error updating ticket status:", err);
    throw new Error("Updating ticket status failed");
  }
};

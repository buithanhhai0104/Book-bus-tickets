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

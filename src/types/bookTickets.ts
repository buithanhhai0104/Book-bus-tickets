export interface IBookTicket {
  ticket_id?: string;
  user_id: number | undefined;
  trip_id: string;
  seat_numbers: string[];
  seat_number?: string;
  name: string;
  phone: string | undefined;
  email: string;
}

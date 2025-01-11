import { ICreateTrip, ITrips } from "@/types/trips";
import axios from "axios";

interface IParams {
  from_location: string;
  to_location: string;
  departure_date: string;
}

export const getAllTrips = async () => {
  try {
    const response = await axios.get("http://localhost:4000/api/trips");
    return response.data;
  } catch (err) {
    console.log("Lỗi gọi api Trips", err);
  }
};

export const createTrip = async (createTripForm: ICreateTrip) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/trips",
      createTripForm,
      {
        headers: {
          "Content-Type": "application/json", // Đảm bảo định dạng JSON
        },
        withCredentials: true, // Để gửi cookie
      }
    );
    return response.data;
  } catch (err) {
    console.log("Lỗi thêm chuyến xe", err);
  }
};
export const deleteTrip = async (id: number) => {
  try {
    const response = await axios.delete(
      `http://localhost:4000/api/trips/${id}`,
      {
        withCredentials: true, // Để gửi cookie
      }
    );
    return response.data;
  } catch (err) {
    console.log("Lỗi xóa chuyến xe", err);
  }
};

export const UpdateTripbyId = async (
  id: number,
  modifiedTrip: ITrips | null
) => {
  try {
    if (modifiedTrip?.departure_time) {
      modifiedTrip.departure_time = new Date(modifiedTrip.departure_time)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
    }
    const respone = await axios.put(
      `http://localhost:4000/api/trips/${id}`,
      modifiedTrip,
      {
        headers: {
          "Content-Type": "application/json", // Đảm bảo định dạng JSON
        },
        withCredentials: true, // Để gửi cookie
      }
    );
    return respone.data;
  } catch (err) {
    console.log("Lỗi chỉnh sửa chuyến đi", err);
  }
};

export const getTripById = async (url: string) => {
  try {
    const response = await axios.get(url, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.log("Lỗi gọi api trip theo id", err);
  }
};

export const apiTripsSearch = async (url: string, params: IParams) => {
  try {
    const response = await axios.get(url, {
      params,
    });
    return response.data;
  } catch (err) {
    console.log("Lỗi gọi api tìm kiếm chuyến xe", err);
  }
};

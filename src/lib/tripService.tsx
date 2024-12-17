import axios from "axios";

interface IParams {
  from_location: string;
  to_location: string;
  departure_date: string;
}

export const apiTrips = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.log("Lỗi gọi api Trips", err);
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

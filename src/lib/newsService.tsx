import axios from "axios";

export const getNewsById = async (url: string) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.log("Lỗi lấy dữ liệu bài báo theo id", err);
  }
};
export const getNewsAll = async (url: string) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.log("Lỗi lấy dữ liệu bài báo theo id", err);
  }
};

import axios from "axios";

const API = axios.create({
  baseURL: "https://retail-sales-management-system-l02b.onrender.com/",
});
export async function fetchSales(params) {
  try {
    const response = await API.get("/sales", { params });
    return response.data;
  } catch (err) {
    console.error("API Sales Fetch Error:", err);
    throw err;
  }
}
export async function fetchTags() {
  try {
    const response = await API.get("/meta/tags");
    return response.data.tags;
  } catch (err) {
    console.error("API Tags Fetch Error:", err);
    throw err;
  }
}

export default API;

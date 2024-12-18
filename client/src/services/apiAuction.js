import axios from "axios"
const API_URL = "http://localhost:8000/auctions";

export async function fetchAuctions() {
  try {
    const response = await axios.get(`${API_URL}/all`);
    return response?.data
  } catch (error) {
    console.error(error);
    throw Error("Failed getting auctions");
  }
}

export async function fetchAuctionDetail(id) {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response?.data
  } catch (error) {
    console.error(error);
    throw Error("Failed getting auction detail");
  }
}
import axios from "axios"
const API_URL = "http://localhost:8000/users";

export async function createNewUser() {
  try {
    const response = await axios.get(`${API_URL}/all`);
    return response?.data
  } catch (error) {
    console.error(error);
    throw Error("Failed getting auctions");
  }
}

export async function authenticateUser() {
  try {
    const response = await axios.get(`${API_URL}/auctions/${id}`);
    return response?.data
  } catch (error) {
    console.error(error);
    throw Error("Failed getting auction detail");
  }
}
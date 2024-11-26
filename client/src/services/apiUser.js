import axios from "axios"
const API_URL = "http://localhost:8000/users";

export async function createNewUser(data) {
  try {
    const response = await axios.post(`${API_URL}/`, data);
    return response?.data
  } catch (error) {
    console.error(error);
    throw Error("Failed to create the user.");
  }
}

export async function authenticateUser(data) {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    return response?.data
  } catch (error) {
    console.error(error);
    throw Error("Incorrect email or password.");
  }
}
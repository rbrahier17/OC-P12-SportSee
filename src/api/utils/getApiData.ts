import axios from "axios";

// Get the API URL from the environment variables. IMPERATIVE TO DEFINE IN .env.
const apiUrl: string = process.env.REACT_APP_API_URL!;

/**
 * Retrieves data from the API based on the given endpoint
 * @param {string} endpoint - The endpoint to send the API request to
 * @returns {Promise<T>} - A promise that resolves with the API response data
 * @throws {Error} - If there is an error with the API request or if data is not received from the API
 */
export default async function getApiData<T>(endpoint: string): Promise<T> {
  try {
    const response = await axios.get(apiUrl + endpoint);

    // If response data is missing, throw an error
    if (!response.data.data) {
      throw new Error("Data not received from API");
    }

    return response.data.data;
  } catch (error: any) {
    if (error.code === "ERR_NETWORK") {
      throw new Error("Unable to connect to API.");
    }
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error("Requested profile data not found by API.");
      } else {
        throw new Error(
          `HTTP error ${error.response.status} occurred while fetching API data: ${error.response.data.message}`
        );
      }
    } else {
      console.error(error);
      throw new Error(`An error occurred while fetching API data: ${error.message}`);
    }
  }
}

/**
 * Fetches data from the API.
 *
 * @async
 * @function
 * @param {string} url - The URL to fetch data from.
 * @property {Object} response - Stores fetched data.
 * @property {Object} data - Parsed HTTP response as json.
 * @returns {Promise<any>} A Promise that resolves with the fetched data.
 * @throws {Error} Throws an error if the HTTP response is not successful.
 */
export const fetchData = async (url) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error while fetching data", error);
    throw error;
  }
};

/**
 * Sends a POST request to the API with given data and url.
 *
 * @async
 * @function
 * @param {string} url - The URL to send the POST request to.
 * @param {Object} data - The data to be sent in the request body.
 * @returns {Promise<any>} A Promise that resolves with the response data.
 * @throws {Error} Throws an error if the HTTP response is not successful.
 */
export const postData = async (url, data) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(response);
    if (response.status === 201 || response.status === 200) {
      // Handle successful response (status 201)
      const responseData = await response.json();
      console.log(responseData);
      return responseData;
    } else if (!response.ok) {
      // Handle other errors
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.log("Error while posting data:", error);
    throw error;
  }
};

/**
 * Sends a PUT request to the API with updated data and url.
 *
 * @async
 * @function
 * @param {string} url - The URL to send the PUT request to.
 * @param {Object} data - The data to be sent in the request body for updating.
 * @returns {Promise<any>} A Promise that resolves with the updated data.
 * @throws {Error} Throws an error if the response is not successful.
 */
export const editData = async (url, data) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(response);
    if (response.status === 201 || response.status === 200) {
      // Handle successful response (status 201)
      const responseData = await response.json();
      console.log(responseData);
      return responseData;
    } else if (!response.ok) {
      // Handle other error cases
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.log("Error while posting data:", error);
    throw error;
  }
};

/**
 * Sends a DELETE request to the API with the correct url containing the id.
 *
 * @async
 * @function
 * @param {string} url - The URL to send the DELETE request to.
 * @returns {Promise<any>} A Promise that resolves once the deletion is successful.
 * @throws {Error} Throws an error if the HTTP response is not successful.
 */
export const deleteData = async (url) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
      method: "DELETE",
    });
    return response.json();
  } catch (error) {
    console.log("Error while deleting task", error);
  }
};

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
      // Handle other error cases
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.log("Error while posting data:", error);
    throw error;
  }
};

export const deleteData = async (url) => {
  try {
    fetch(url, {
      method: "DELETE",
    }).then((resp) => resp.json());
  } catch (error) {
    console.log("Error while deleting task", error);
  }
};

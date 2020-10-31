/* helper function to facilitate sending requests to the backend API */
export async function customFetch(url, method = "GET", requestBody) {
  const fetchObject = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (requestBody) {
    fetchObject.body = JSON.stringify(requestBody);
  }

  let response = await fetch(url, fetchObject);
  if (response.status >= 400) {
      /* TODO: error handling */
      return {};
  } else {
    return await response.json();
  }
}
